import { format, getDay, getMonth, getYear } from 'date-fns'

import formatDate from './formatDate'
import normalizeDate from './normalizeDate'

export default (date1input, date2input) => {
  let date1 = normalizeDate(date1input)
  let date2 = normalizeDate(date2input || new Date())

  // Sensible defaults
  // Normally date1 is older, but if only one is passed, we support it the other way around too
  if (!date2input && date1 > date2) {
    [date1, date2] = [date2, date1]
  }

  const year1 = getYear(date1)
  const year2 = getYear(date2)

  // Different years
  if (year1 !== year2) {
    return formatDate(date1) + ' – ' + formatDate(date2)
  }

  const month1 = getMonth(date1)
  const month2 = getMonth(date2)

  // Different month of same year
  if (month1 !== month2) {
    return (
      format(date1, 'd MMMM') +
      ' – ' +
      format(date2, 'd MMMM') +
      ' ' +
      format(date1, 'yyyy')
    )
  }

  const day1 = getDay(date1)
  const day2 = getDay(date2)

  // Different day
  if (day1 !== day2) {
    return (
      format(date1, 'd') +
      ' – ' +
      format(date2, 'd') +
      ' ' +
      format(date1, 'MMMM yyyy')
    )
  }

  // Same day
  return formatDate(date1)
}
