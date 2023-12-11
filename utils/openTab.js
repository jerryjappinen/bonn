import windowExists from './windowExists'

export default (url) => {
  if (windowExists()) {
    window.open(url, '_blank')
  }
}
