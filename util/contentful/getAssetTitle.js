export default (asset) => {
  if (asset.fields.title) {
    return asset.fields.title
  }

  if (asset.fields.description) {
    return asset.fields.description
  }

  return asset.fields.file.filename
}
