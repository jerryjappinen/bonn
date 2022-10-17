import isTest from './isTest'
import processEnvExists from './processEnvExists'

export default () => {
  if (isTest()) {
    return true
  }

  if (processEnvExists()) {
    return (process.env.NODE_ENV || '').toLowerCase() === 'development'
  }

  return false
}
