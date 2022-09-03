import isSuffixed from './isSuffixed'

const removeCharacters = (string, length) => {
  return string.substr(0, string.length - length)
}

export default (string, suffix) => {
  let result = '' + string
  const suffixLength = suffix.length

  if (suffixLength) {
    while (isSuffixed(result, suffix)) {
      result = removeCharacters(result, suffixLength)
    }
  }

  return result
}
