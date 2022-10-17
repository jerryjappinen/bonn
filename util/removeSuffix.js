import isSuffixed from './isSuffixed'

export default (string, suffix) => {
  if (string && string.length && suffix && suffix.length) {
    let result = '' + string

    if (suffix.length) {
      while (isSuffixed(result, suffix)) {
        result = result.substring(0, result.length - suffix.length)
      }
    }

    return result
  }

  return string
}
