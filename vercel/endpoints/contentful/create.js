import endpoint from '../../endpoint'

import getEnvironmentToManage from '../../../util/contentful/getEnvironmentToManage'
import createEntry from '../../../util/contentful/createEntry'

// Wrapper endpoint for fetching contentful entries
export default async (options) => {
  const environmentToManage = await getEnvironmentToManage(options)

  return endpoint(async ({ query }) => {
    return createEntry(environmentToManage, query.contentType, query.fields, query.languageCode)
  })
}
