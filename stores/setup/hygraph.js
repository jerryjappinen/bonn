import { ref, computed, unref } from 'vue'

import { request as graphqlRequest } from 'graphql-request'
import unwrap from 'graphql-unwrap'

// import filter from 'lodash/filter'
import flatten from 'lodash/flatten'
import groupBy from 'lodash/groupBy'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'
import pickBy from 'lodash/pickBy'

// Defaults
const contentApiBaseUrl = 'https://api-eu-central-1.hygraph.com/v2/'
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

export default (optionsInput) => {
  const options = isString(optionsInput) ? { projectId: optionsInput } : (optionsInput || {})

  const persist = optionsInput.persist ? persistConfig : false

  // Customisation
  const projectId = ref(unref(options.projectId)) // required
  const environment = ref(unref(options.environment)) || defaultEnvironment

  // Callback per type for orderBy
  // https://lodash.com/docs/4.17.15#orderBy
  // { App: 'slug', Author: (entry, entriesById) => { return entriesById[app.author].name }]] }
  const entriesOrderedBy = ref(options.orderBy || {})

  // Callback per type for keyBy
  // https://lodash.com/docs/4.17.15#keyBy
  // { App: ['slug', ['longSlug', (app, entriesById) => { return entriesById[app.author].name }]] }
  const entriesKeyedBy = ref(options.keyBy || {})

  // Callback per type for groupBy
  // https://lodash.com/docs/4.17.15#groupBy
  // { App: ['category', ['authorName', (app, entriesById) => { return entriesById[app.author].name }]] }
  // const entriesGroupedBy = ref(options.groupBy || {})

  // Extended config

  const apiUrl = computed(() => {
    return (unref(options.apiUrl) || contentApiBaseUrl) + projectId.value + '/' + environment.value
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
    return sortEntriesByType(unsortedEntriesByType.value, entriesOrderedBy.value)
  })

  const entryTypes = computed(() => {
    return Object.keys(entriesByType.value)
  })

  // Keyed and grouped entries

  const keyedEntries = computed(() => {
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
        return keyBy(entries, keyByCallback)
      })
    })
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
    return (options.request || graphqlRequest)(apiUrl, query, variables)
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

  // Store API
  return {
    persist,

    apiUrl,
    assetUploadUrl,
    managementApiUrl,

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
    request,
    fetch,
    fetchMultiple
  }
}
