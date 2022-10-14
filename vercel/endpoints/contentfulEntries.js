import createClient from 'contentful-util/createClient'
import fetchFlat from 'contentful-util/fetchFlat'

import endpoint from '../endpoint'

// Wrapper endpoint for fetching contentful entries
export default (options) => {
  const client = createClient(options)

  return endpoint(({ query }) => {
    return fetchFlat(client, ...(query.queries || [query]))
  })
}
