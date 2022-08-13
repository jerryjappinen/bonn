import windowExists from './windowExists'

export default () => {
  if (windowExists()) {
    window.document.activeElement.blur()
  }
}
