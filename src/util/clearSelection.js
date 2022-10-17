import windowExists from './windowExists'

// Clear user's selection
export default () => {
  if (windowExists()) {
    if (
      window.document &&
      window.document.selection &&
      window.document.selection.empty
    ) {
      window.document.selection.empty()
    } else if (window.getSelection) {
      window.getSelection().removeAllRanges()
    }
  }
}
