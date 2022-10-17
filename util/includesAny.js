import includes from 'lodash-es/includes'
import some from 'lodash-es/some'

export default (collection, values, startsAt) => {
  return some(values, (value) => {
    return includes(collection, value, startsAt)
  })
}
