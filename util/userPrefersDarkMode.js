import windowExists from './windowExists'

export default () => {
  if (windowExists() && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true
    }

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return false
    }
  }

  return null
}
