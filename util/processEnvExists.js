import processExists from './processExists'

export default () => {
  return !!(processExists() && process.env)
}
