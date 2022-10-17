import isArray from 'lodash-es/isArray'
import mergeWith from 'lodash-es/mergeWith'

// Also merge arrays
// https://lodash.com/docs/4.17.15#mergeWith
export default (...objects) => {
  return mergeWith({}, ...objects, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
}
