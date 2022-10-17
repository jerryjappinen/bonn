import isSuffixed from './isSuffixed'
import removeSuffix from './removeSuffix'

export default (string, suffix, keepDuplicates) => {
  if ((string || string === '') && suffix && suffix.length) {
    if (isSuffixed(string, suffix)) {
      if (!keepDuplicates) {
        return removeSuffix(string, suffix) + suffix
      }

      return string
    }

    return string + suffix
  }

  return string
}
