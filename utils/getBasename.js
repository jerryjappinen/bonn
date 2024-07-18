import trim from 'lodash-es/trim'

export default (path) => {
  return trim(path, '/').split(/[\\/]/).pop()
}
