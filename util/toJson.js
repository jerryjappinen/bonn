import safeJsonStringify from 'safe-json-stringify'

export default (data, trim) => {
  if (trim) {
    return safeJsonStringify(data)
  }
  return safeJsonStringify(data, null, 2)
}
