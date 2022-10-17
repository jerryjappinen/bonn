import windowExists from './windowExists'

export default (keepCache) => {
  if (windowExists()) {
    window.location.reload(!keepCache)
  }
}
