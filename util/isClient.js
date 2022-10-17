import isServer from './isServer'

export default () => {
  return !isServer()
}
