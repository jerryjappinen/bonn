// FIXME: lots of duplication with Hygraph
// Sorting/filtering etc. could be separated into composables
import { ref, computed } from 'vue'

import flatten from 'lodash-es/flatten'
import groupBy from 'lodash-es/groupBy'
import isArray from 'lodash-es/isArray'
import isEmpty from 'lodash-es/isEmpty'
import isFunction from 'lodash-es/isFunction'
import isString from 'lodash-es/isString'
import isUndefined from 'lodash-es/isUndefined'
import keyBy from 'lodash-es/keyBy'
import mapValues from 'lodash-es/mapValues'
import merge from 'lodash-es/merge'
import orderBy from 'lodash-es/orderBy'
import pickBy from 'lodash-es/pickBy'

import createClient from '../../util/contentful/createClient'
import fetchContentfulData from '../../util/contentful/fetch'
import getEntryType from '../../util/contentful/getEntryType'

// Defaults
const persistConfig = {
  paths: [
    'spaceId',
    'environment',
    'accessToken',
    'previewAccessToken',
    'entriesById'
  ]
}

// Base sorting by type
const sortEntriesByType = (entriesByType, sorters) => {
  const sorted = {}

  // Apply sorting to list, if sorter has been defined
  for (const type in entriesByType) {
    sorted[type] = sorters[type]
      ? orderBy(entriesByType[type], sorters[type])
      : sorted[type] = entriesByType[type]
  }

  return sorted
}

// Returns setup function
export default (optionsInput) => {
  return () => {
    // console.log('contentful setup: optionsInput', optionsInput)

    const options = isString(optionsInput) ? { spaceId: optionsInput } : (optionsInput || {})

    const persist = options.persist ? persistConfig : false

    // Customisation
    const spaceId = ref()
    const environment = ref()
    const accessToken = ref()
    const previewAccessToken = ref()

    const entriesOrderedBy = ref()
    const entriesKeyedBy = ref()
    const entriesGroupedBy = ref()

    const client = computed(() => {
      if (spaceId.value) {
        return createClient({
          space: spaceId.value,
          environment: environment.value,
          accessToken: accessToken.value,
          previewAccessToken: previewAccessToken.value
        })
      }

      return null
    })

    // Basic entry data

    const entriesById = ref({})

    const unsortedEntriesByType = computed(() => {
      return groupBy(entriesById.value, getEntryType)
    })

    const entriesByType = computed(() => {
      if (entriesOrderedBy.value && !isEmpty(entriesOrderedBy.value)) {
        return sortEntriesByType(unsortedEntriesByType.value, entriesOrderedBy.value)
      }

      return unsortedEntriesByType.value
    })

    const entryTypes = computed(() => {
      return Object.keys(entriesByType.value)
    })

    // Keyed entries
    // Entries are keyed by unique attributes based on config
    // E.g. `keyedEntries.Post.slug['release-announcement']` would include a Post if `options.keyBy` is { Post: ['slug'] }
    const keyedEntries = computed(() => {
      if (entriesKeyedBy.value && !isEmpty(entriesKeyedBy.value)) {
        // Normalise callback config
        // NOTE: might include unused callbacks, but no need to filter them out either
        // Might be just one callback: turn it into an array
        const keyByCallbacksByType = mapValues(entriesKeyedBy.value, (callbackInput) => {
          return flatten([callbackInput])
        })

        // Only return entries that we have callbacks for
        const filteredEntriesByType = pickBy(entriesByType.value, (value, typeName) => {
          return !!keyByCallbacksByType[typeName]
        })

        // Get the keyed entries per type
        return mapValues(filteredEntriesByType, (entries, typeName) => {
          // NOTE: one type can have multiple keys
          // We must create a key for each one, and then get the actual list
          const callbacksByKey = mapValues(
            keyBy(keyByCallbacksByType[typeName], (keyByCallback) => {
              // 'author'
              if (isString(keyByCallback)) {
                return keyByCallback
              }

              // ['authorSlug', () => { ... }]
              if (isArray(keyByCallback)) {
                return keyByCallback[0]
              }

              // { key: 'authorSlug', callback: () => { ... } }
              return keyByCallback.key
            }),

            // Callback to create the list by
            (callback) => {
              return callback.callback || isArray(callback) ? callback[1] : callback
            }
          )

          // Now we can finally get the actual list per type
          return mapValues(callbacksByKey, (keyByCallback) => {
            // Pass entries to callback
            if (isFunction(keyByCallback)) {
              return keyBy(entries, (...args) => {
                return keyByCallback(...args, entriesById.value)
              })
            }

            // Default behavior
            return keyBy(entries, keyByCallback)
          })
        })
      }

      return {}
    })

    // Very similar to above, but composing groups instead of keyed entries
    const groupedEntries = computed(() => {
      if (entriesGroupedBy.value && !isEmpty(entriesGroupedBy.value)) {
        // Normalise callback config
        // NOTE: might include unused callbacks, but no need to filter them out either
        // Might be just one callback: turn it into an array
        const groupByCallbacksByType = mapValues(entriesGroupedBy.value, (callbackInput) => {
          return flatten([callbackInput])
        })

        // Only return entries that we have callbacks for
        const filteredEntriesByType = pickBy(entriesByType.value, (value, typeName) => {
          return !!groupByCallbacksByType[typeName]
        })

        // Get the grouped entries per type
        return mapValues(filteredEntriesByType, (entries, typeName) => {
          // NOTE: one type can have multiple groupings
          // We must create a key for each one, and then get the actual list
          // FIXME: duplication from above
          const callbacksByKey = mapValues(
            keyBy(groupByCallbacksByType[typeName], (groupByCallback) => {
              // 'author'
              if (isString(groupByCallback)) {
                return groupByCallback
              }

              // ['authorSlug', () => { ... }]
              if (isArray(groupByCallback)) {
                return groupByCallback[0]
              }

              // { key: 'authorSlug', callback: () => { ... } }
              return groupByCallback.key
            }),

            // Callback to create the list by
            (callback) => {
              return callback.callback || isArray(callback) ? callback[1] : callback
            }
          )

          // { Post: { slug: 'slug' } }

          // Now we can finally get the actual list per type
          return mapValues(callbacksByKey, (groupByCallback) => {
            // Pass entries to callback
            if (isFunction(groupByCallback)) {
              return groupBy(entries, (...args) => {
                return groupByCallback(...args, entriesById.value)
              })
            }

            // Default behavior
            return groupBy(entries, groupByCallback)
          })
        })
      }

      return {}
    })

    // Methods

    const request = async (...queries) => {
      if (options.request) {
        return options.request(...queries)
      }

      if (client.value) {
        return fetchContentfulData(client.value, ...queries)
      }

      throw new Error('Define space ID or a request method to fetch Contentful data')
    }

    const fetch = async (...queries) => {
      const [newEntries, ...trimmedResponses] = await request(...queries)

      // console.log('stores/setup/contentful:response', response)

      entriesById.value = merge({}, entriesById.value, newEntries)

      return trimmedResponses
    }

    // Set up options and customised behavior
    const init = (input) => {
      if (!isUndefined(input.spaceId) || !isUndefined(input.space)) {
        spaceId.value = input.spaceId || input.space
      }

      if (!isUndefined(input.environment)) {
        environment.value = input.environment
      }

      if (!isUndefined(input.accessToken)) {
        accessToken.value = input.accessToken
      }

      if (!isUndefined(input.previewAccessToken)) {
        previewAccessToken.value = input.previewAccessToken
      }

      // Callback per type for orderBy
      // https://lodash.com/docs/4.17.15#orderBy
      // { App: 'slug', Author: (entry, entriesById) => { return entriesById[app.author].name }]] }
      if (!isUndefined(input.orderBy)) {
        entriesOrderedBy.value = input.orderBy
      }

      // Callback per type for keyBy
      // https://lodash.com/docs/4.17.15#keyBy
      // { App: ['slug', ['longSlug', (app, entriesById) => { return entriesById[app.author].name }]] }
      if (!isUndefined(input.keyBy)) {
        entriesKeyedBy.value = input.keyBy
      }

      // Callback per type for groupBy
      // https://lodash.com/docs/4.17.15#groupBy
      // { App: ['category', ['authorName', (app, entriesById) => { return entriesById[app.author].name }]] }
      // const entriesGroupedBy = ref(options.groupBy || {})
      if (!isUndefined(input.groupBy)) {
        entriesGroupedBy.value = input.groupBy
      }
    }

    init(optionsInput)

    const expose = {
      persist,

      spaceId,
      environment,
      accessToken,
      previewAccessToken,

      entriesOrderedBy,
      entriesKeyedBy,
      entriesGroupedBy,

      // Entry data
      entriesById,
      entriesByType,
      entryTypes,
      // unsortedEntriesByType,

      keyedEntries,
      groupedEntries,

      // Actions
      init,
      request,
      fetch
    }

    // console.log('contentful setup: expose', expose)

    // Store API
    return expose
  }
}
