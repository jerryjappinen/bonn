import isDev from './isDev'

export default () => {
  return !isDev()
}
