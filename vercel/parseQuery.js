import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'
import map from 'lodash-es/map'
import mapValues from 'lodash-es/mapValues'

// eslint-disable-next-line import/default
import qs from 'qs'

export default (queryObjectToParse) => {
  if (queryObjectToParse) {
    const query = {
      ...qs.parse(qs.stringify(queryObjectToParse))
    }

    for (const key in query) {
      // Convert JSON objects to JS objects
      try {
        if (isArray(query[key])) {
          query[key] = map(query[key], JSON.parse)
        } else if (isPlainObject(query[key])) {
          query[key] = mapValues(query[key], JSON.parse)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error parsing JSON value', error)
      }
    }

    return query
  }

  return {}
}
