export default () => {
  return !!((process.env.NODE_ENV || '').toLowerCase() === 'test')
}
