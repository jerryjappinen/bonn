export default () => {
  return !!(((process && process.env && process.env.NODE_ENV) || '').toLowerCase() === 'test')
}
