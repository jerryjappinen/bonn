import endpoint from '../endpoint'

import createClient from '../../util/contentful/createClient'
import fetch from '../../util/contentful/fetch'

// Wrapper endpoint for fetching contentful entries
export default (options) => {
  const client = createClient(options)

  return endpoint(({ query }) => {
    return fetch(client, ...(query.queries || [query]))
  })
}
