// Check if keyboard event has meta key
export default (event) => {
  return !!(event.ctrlKey || event.metaKey)
}
