export default (entry) => {
  return entry && entry.sys && entry.sys.contentType && entry.sys.contentType.sys ? entry.sys.contentType.sys.id : null
}
