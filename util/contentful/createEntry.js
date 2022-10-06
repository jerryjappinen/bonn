// https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entry/create-update-an-entry/console/js
export default async (environmentToManage, contentType, fields, languageCode) => {
  const normalizedFields = {}

  // FIXME: does not support proper localisation
  for (const key in fields) {
    normalizedFields[key] = {
      [languageCode || 'en-US']: fields[key]
    }
  }
  const entry = await environmentToManage.createEntry(contentType, {
    fields: normalizedFields
  })

  await entry.publish()

  return entry
}
