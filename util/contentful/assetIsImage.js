import getAssetType from './getAssetType'

export default (asset) => {
  return getAssetType(asset) === 'image'
}
