import camelCase from 'lodash-es/camelCase'

// Return a lowercase, short string without special characters
export default (string, length) => {
  return camelCase('' + string)
    .toLowerCase()
    .slice(0, (length || 64))
}
