import createClient from 'contentful-util/src/createClient'
import fetchFlat from 'contentful-util/src/fetchFlat'

import endpoint from '../endpoint'

// Wrapper endpoint for fetching contentful entries
export default (options) => {
  const client = createClient(options)

  return endpoint(({ query }) => {
    return fetchFlat(client, ...(query.queries || [query]))
  })
}
