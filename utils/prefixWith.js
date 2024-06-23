import isPrefixed from './isPrefixed'
import removePrefix from './removePrefix'

export default (string, prefix, keepDuplicates) => {
  if ((string || string === '') && prefix && prefix.length) {
    if (isPrefixed(string, prefix)) {
      if (!keepDuplicates) {
        return prefix + removePrefix(string, prefix)
      }

      return string
    }

    return prefix + string
  }

  return string
}
