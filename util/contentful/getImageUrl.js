import isPlainObject from 'lodash-es/isPlainObject'
import snakeCase from 'lodash-es/snakeCase'

import getAssetUrl from './getAssetUrl'

// https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/change-the-resizing-behavior
export default (url, options) => {
  const realUrl = getAssetUrl(url, options)

  if (realUrl) {
    const realOptions = isPlainObject(url) ? url : (options || {})
    const params = []

    // Set fit & resize behavior easily
    if (realOptions.fit) {
      params.push('fit=' + snakeCase(realOptions.fit))
    }

    if (realOptions.focus) {
      params.push('f=' + snakeCase(realOptions.focus))
    }

    if (realOptions.format) {
      params.push('fm=' + realOptions.format.toLowerCase())
    }

    if (realOptions.width) {
      params.push('w=' + Math.round(realOptions.width))
    }

    if (realOptions.height) {
      params.push('h=' + Math.round(realOptions.height))
    }

    return realUrl + (params.length ? '?' + params.join('&') : '')
  }

  return null
}
