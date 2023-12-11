// Condence all whitespace in a string to maximum of one space
export default (string, preserveEnd) => {
  const trimmed = (string || '').replace(/\s+/g, ' ')

  if (preserveEnd) {
    return trimmed.trimStart()
  }

  return trimmed.trim()
}
