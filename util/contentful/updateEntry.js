// https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entry/create-update-an-entry/console/js
export default async (environmentToManage, entryId, newFields, languageCode) => {
  const entry = await environmentToManage.getEntry(entryId)

  // FIXME: does not support proper localisation
  for (const key in newFields) {
    entry.fields[key] = {
      [languageCode || 'en-US']: newFields[key]
    }
  }

  const updatedEntry = await entry.update()

  return updatedEntry
}
