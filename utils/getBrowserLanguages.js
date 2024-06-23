import windowExists from './windowExists'

export default () => {
  if (windowExists()) {
    return window.navigator.languages || []
  }
  return []
}
