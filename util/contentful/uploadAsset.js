// https://www.contentful.com/developers/docs/references/content-management-api/#/reference/uploads/upload-a-file/creating-an-upload-resource/console/js
export default async (environmentToManage, contentType, file, title, description) => {
  const asset = await environmentToManage.createAssetFromFiles({
    fields: {
      title,
      description,
      file: {
        content_type: contentType,
        file
      }
    }
  })

  await asset.publish()

  return asset
}
