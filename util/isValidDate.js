import isDate from 'lodash-es/isDate'
import isNaN from 'lodash-es/isNaN'

export default (value) => {
  if (isDate(value) && value.getTime && !isNaN(value.getTime())) {
    return true
  }
  return false
}
