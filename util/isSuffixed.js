export default (string, suffix) => {
  if (suffix && string.substr(-suffix.length) === suffix) {
    return true
  }

  return false
}
