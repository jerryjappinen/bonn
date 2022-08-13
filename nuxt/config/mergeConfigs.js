// NOTE: module loading in nuxt.config is broken, so we have to do this here
// https://github.com/nuxt/framework/issues/6205
import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'
import isArray from 'lodash-es/isArray'
import mergeWith from 'lodash-es/mergeWith'

// Merge objects and arrays recursively
// https://lodash.com/docs/4.17.15#mergeWith
export default (...args) => {

  // Allow passing falsy values from helpers
  const objects = compact(flatten(args))

  // Merge objects recursively
  return mergeWith({}, ...objects, (objValue, srcValue) => {

    // Merge nested arrays
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }

  })
}
