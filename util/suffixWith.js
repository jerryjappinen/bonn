import isSuffixed from './isSuffixed'
import removeSuffix from './removeSuffix'

export default (string, suffix, onlyOneSuffix) => {
  if (isSuffixed(string, suffix)) {
    if (onlyOneSuffix) {
      return removeSuffix(string, suffix) + suffix
    }

    return string
  }

  return string + suffix
}
