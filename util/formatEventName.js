import camelCase from 'lodash-es/camelCase'
import lowerCase from 'lodash-es/lowerCase'
import map from 'lodash-es/map'

// Convert event name to a conventional colon-separated string that's safe to use in HTML templates
export default (...eventNameParts) => {
  return map(eventNameParts, (eventNamePart) => {
    return lowerCase(camelCase(eventNamePart))
  }).join(':')
}
