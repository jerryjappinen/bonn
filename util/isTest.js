import processEnvExists from './processEnvExists'

export default () => {
  if (processEnvExists()) {
    return (process.env.NODE_ENV || '').toLowerCase() === 'test'
  }

  return false
}
