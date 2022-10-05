import isArray from 'lodash-es/isArray'
import omit from 'lodash-es/omit'

import { extractNestedEntries, fetch } from 'fetch-deep-contentful-data'

const normalizeQuery = (query) => {
  return omit({
    limit: 500,
    ...query
  }, [
    'meta'
  ])
}

export default async (contentfulClient, ...queries) => {
  if (queries && queries.length) {
    const responses = await fetch(contentfulClient, ...queries.map(normalizeQuery))

    const responsesToParse = isArray(responses)
      ? responses
      : [responses]

    // Compose optimised API response
    let entries = {}
    let trimmedResponses = []
    responsesToParse.forEach((response) => {
      // Collect (nested) entries from each response to one object
      // NOTE: this way, each unique piece of content is only included one
      entries = {
        ...entries,
        ...extractNestedEntries(response.items)
      }

      // Response object only include meta data
      trimmedResponses.push({
        ...omit(response, [
          'items',
          'includes'
        ]),

        // Former "items" included all entries
        // We replace that with a list of IDs of the query
        entryIds: response.items
          ? response.items.map((entry) => {
            return entry.sys.id
          })
          : []
      })
    })

    // Unless user requests the meta data in the query, we only send the IDs
    trimmedResponses = trimmedResponses.map((trimmedResponse, i) => {
      if (queries[i] && queries[i].meta) {
        return trimmedResponses
      }
      return trimmedResponse.entryIds
    })

    // First element is an empty list of entries, followed by the response of each query
    return [
      entries,
      ...trimmedResponses
    ]
  }

  // No data returned
  return [
    [] // Empty list of entries
  ]
}
