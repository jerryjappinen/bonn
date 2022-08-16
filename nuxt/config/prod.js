import isDev from '../../util/isDev'

export default (config) => {
  if (!isDev()) {
    return config || {}
  }
  return {}
}
