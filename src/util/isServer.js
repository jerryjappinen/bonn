import windowExists from './windowExists'

export default () => {
  // @ts-ignore
  return (process && process.server) || !windowExists()
}
