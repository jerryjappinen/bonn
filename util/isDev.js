import isTest from './isTest'

export default () => {
  return isTest() || !!(((process && process.env && process.env.NODE_ENV) || '').toLowerCase() === 'development')
}
