import eventHasMetaKey from './eventHasMetaKey'

// Check if keyboard event has meta key or shift
export default (event) => {
  return !!(eventHasMetaKey(event) || event.shiftKey)
}
