import isPlainObject from 'lodash-es/isPlainObject'
import isString from 'lodash-es/isString'

// https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/change-the-resizing-behavior
export default (url, options) => {
  const realOptions = isPlainObject(url) ? url : (options || {})
  let realUrl = null

  // URL
  if (url && isString(url)) {
    realUrl = url

  // Options object with URL
  } else if (realOptions.url) {
    realUrl = realOptions.url

  // Image asset
  } else if (
    realOptions.asset &&
    realOptions.asset.fields &&
    realOptions.asset.fields.file &&
    realOptions.asset.fields.file.url
  ) {
    realUrl = realOptions.asset.fields.file.url
  }

  return realUrl || null
}
