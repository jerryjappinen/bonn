// Clear user's selection
export default (userAgentString, prefix) => {
  const normalizedPrefix = prefix.trim() + '/'
  let value

  // Find match from UA string
  const prefixIndex = userAgentString.indexOf(normalizedPrefix)
  if (prefixIndex > -1) {
    value = userAgentString.substr(prefixIndex + normalizedPrefix.length)

    // Leave out anything after a space
    const spaceIndex = value.indexOf(' ')
    if (spaceIndex > -1) {
      value = value.substr(0, spaceIndex)
    }
  }

  return value || null
}
