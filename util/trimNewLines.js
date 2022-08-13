export default (string) => {
  return (string || '').replace(/[\r\n]+/g, ' ')
}
