import normalizeDate from './normalizeDate'

export default (date) => {
  return normalizeDate(date || new Date()).toISOString()
}
