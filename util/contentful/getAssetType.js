import getAssetMimeType from './getAssetMimeType'

const types = {
  'image/png': 'image',
  'image/jpg': 'image',
  'image/jpeg': 'image',
  'image/gif': 'image',
  'image/bmp': 'image',
  'image/webp': 'image',

  'application/pdf': 'pdf',

  'video/ogg': 'video',
  'video/mov': 'video',
  'video/mp4': 'video',
  'video/webv': 'video'
}

export default (asset) => {
  return types[getAssetMimeType(asset)] || 'file'
}
