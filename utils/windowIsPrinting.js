import windowExists from './windowExists'

export default () => {
  if (windowExists() && window.matchMedia) {
    if (window.matchMedia('print').matches) {
      return true
    }

    if (window.matchMedia('screen').matches) {
      return false
    }
  }

  return null
}
