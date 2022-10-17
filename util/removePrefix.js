import isPrefixed from './isPrefixed'

export default (string, prefix) => {
  if (string && string.length && prefix && prefix.length) {
    let result = '' + string

    if (prefix.length) {
      while (isPrefixed(result, prefix)) {
        result = result.substring(prefix.length)
      }
    }

    return result
  }

  return string
}
