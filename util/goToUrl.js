import windowExists from './windowExists'

export default (url) => {
  if (windowExists()) {
    window.location = url
  }
}
