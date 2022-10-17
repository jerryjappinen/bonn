import compact from 'lodash-es/compact'
import flattenDeep from 'lodash-es/flattenDeep'

export default (...args) => {
  const transpile = compact(flattenDeep(args))

  if (transpile.length) {
    return {
      build: {
        transpile
      }
    }
  }

  return {}
}
