export default (string, prefix) => {
  if (
    string &&
    string.length &&
    prefix &&
    prefix.length &&
    string.substring(0, prefix.length) === prefix
  ) {
    return true
  }

  return false
}
