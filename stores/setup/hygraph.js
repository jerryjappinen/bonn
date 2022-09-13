import { ref, computed, unref } from 'vue'

import { request as graphqlRequest } from 'graphql-request'
import unwrap from 'graphql-unwrap'

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

// Defaults
const defaultEnvironment = 'master'
const persistConfig = {
  paths: [
    'projectId',
    'environment',
    'entriesById'
  ]
}

// Base sorting by type
const sortEntriesByType = (entriesByType, sorters) => {
  const sorted = {}

  // Apply sorting to list, if sorter has been defined
  for (const type in entriesByType) {
    if (sorters[type]) {
      sorted[type] = orderBy(entriesByType[type], sorters[type])
    } else {
      sorted[type] = entriesByType[type]
    }
  }

  return sorted
}

// Returns setup function
export default (optionsInput) => {
  return () => {
    // console.log('hygraph setup: optionsInput', optionsInput)

    const options = isString(optionsInput) ? { apiUrl: optionsInput } : (optionsInput || {})

    const persist = options.persist ? persistConfig : false

    // Customisation
    const customApiUrl = ref()
    const domain = ref()
    const projectId = ref()
    const environment = ref(defaultEnvironment)
    const entriesOrderedBy = ref()
    const entriesKeyedBy = ref()

    // Callback per type for groupBy
    // https://lodash.com/docs/4.17.15#groupBy
    // { App: ['category', ['authorName', (app, entriesById) => { return entriesById[app.author].name }]] }
    // const entriesGroupedBy = ref(options.groupBy || {})

    // Extended config

    const apiUrl = computed({

      get () {
        return customApiUrl.value || `https://${domain.value}.hygraph.com/v2/${projectId.value}/${environment.value}`
      },

      set (value) {
        customApiUrl.value = value
      }

    })

    const assetUploadUrl = computed(() => {
      return apiUrl.value + '/upload'
    })

    const managementApiUrl = computed(() => {
      return 'https://management.hygraph.com/graphql'
    })

    // Basic entry data

    const entriesById = ref({})

    const unsortedEntriesByType = computed(() => {
      return groupBy(entriesById.value, '__typename')
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

    // Keyed and grouped entries

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

    // const groupedEntries = computed(() => {})

    // const getters = {
    //   appsBySlug () {
    //     return keyBy(this.entriesByType.App || [], 'slug')
    //   },
    //   supportedApps () {
    //     return filter(this.entriesByType.App || [], (app) => {
    //       return app.isSupported
    //     })
    //   },
    //   articlesBySlug () {
    //     return keyBy(this.entriesByType.Article || [], 'slug')
    //   }
    // }

    // Methods

    const request = async (query, variables) => {
      return (options.request || graphqlRequest)(apiUrl.value, query, variables)
    }

    const fetch = async (query, variables) => {
      const response = await request(query, variables)

      console.log('stores/setup/hygraph:response', response)

      const [newEntries, ids] = unwrap(response)

      entriesById.value = merge({}, entriesById.value, newEntries)

      return ids
    }

    // NOTE: when using this, these could always be combined into a single query
    // A single query might be faster, but separate queries will resolve independently
    // Separate queries might also be easier to maintain client-side
    const fetchMultiple = async (...queriesAndVariables) => {
      return Promise.all(queriesAndVariables.map((arg) => {
        // Arg can be one query, or an array with a query and a variable
        if (isArray(arg)) {
          return fetch(arg[0], arg[1])
        }

        return fetch(arg)
      }))
    }

    // Set up options and customised behavior
    const init = (input) => {
      if (!isUndefined(input.apiUrl)) {
        customApiUrl.value = input.apiUrl
      }

      // required if apiUrl is not set, e.g. 'api-eu-west-2'
      if (!isUndefined(input.domain)) {
        domain.value = input.domain
      }

      // required if apiUrl is not set, e.g. 'cl7n4zm4t28ec01uh0oum04sc'
      if (!isUndefined(input.projectId)) {
        projectId.value = input.projectId
      }

      if (!isUndefined(input.environment)) {
        environment.value = input.environment
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
    }

    init(optionsInput)

    const expose = {
      persist,

      apiUrl,
      assetUploadUrl,
      managementApiUrl,

      domain,
      projectId,
      environment,

      entriesOrderedBy,
      entriesKeyedBy,
      // entriesGroupedBy,

      // Entry data
      entriesById,
      entriesByType,
      entryTypes,
      // unsortedEntriesByType,

      keyedEntries,
      // groupedEntries,

      // Actions
      init,
      request,
      fetch,
      fetchMultiple
    }

    // console.log('hygraph setup: expose', expose)

    // Store API
    return expose
  }
}
