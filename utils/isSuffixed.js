export default (string, suffix) => {
  if (
    string &&
    string.length &&
    suffix &&
    suffix.length &&
    string.substring(string.length - suffix.length) === suffix
  ) {
    return true
  }

  return false
}
