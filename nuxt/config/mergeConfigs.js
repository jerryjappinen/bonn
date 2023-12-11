// FIXME: duplicate of ../utils/mergeConfigs
// Kept for now for backwards compatibility and ESM/CJS compatibility issues
import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'
import isArray from 'lodash-es/isArray'
import mergeWith from 'lodash-es/mergeWith'

export default (...args) => {
  const objects = compact(flatten(args))
  return mergeWith({}, ...objects, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
}
