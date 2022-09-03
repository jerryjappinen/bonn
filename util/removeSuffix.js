import isSuffixed from './isSuffixed'

const removeCharacters = (string, length) => {
  return string.substr(0, string.length - length)
}

export default (string, suffix) => {
  if (string && string.length && suffix && suffix.length) {
    let result = '' + string

    if (suffix.length) {
      while (isSuffixed(result, suffix)) {
        result = removeCharacters(result, suffix.length)
      }
    }

    return result
  }

  return string
}
