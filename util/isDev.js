import isTest from './isTest'

export default () => {
  return !!((process.env.NODE_ENV || '').toLowerCase() === 'development' || isTest())
}
