export default (value, length) => {
  if (length === 0) {
    return '' + Number.parseInt(value)
  }
  return Number.parseFloat(value).toFixed(length || 2)
}
