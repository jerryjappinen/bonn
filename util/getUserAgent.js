import windowExists from './windowExists'

export default () => {
  if (windowExists() && window.navigator && window.navigator.userAgent) {
    return window.navigator.userAgent
  }

  return value || null
}
