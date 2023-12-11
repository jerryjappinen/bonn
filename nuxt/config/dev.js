import isDev from '../../utils/isDev'

export default (config) => {
  if (isDev()) {
    return (config || {})
  }
  return {}
}
