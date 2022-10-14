import getEnvironmentToManage from 'contentful-util/getEnvironmentToManage'
import createEntry from 'contentful-util/createEntry'

import endpoint from '../endpoint'

// Wrapper endpoint for fetching contentful entries
export default async (options) => {
  const environmentToManage = await getEnvironmentToManage(options)

  return endpoint(({ query }) => {
    return createEntry(environmentToManage, query.contentType, query.fields, query.languageCode)
  })
}
