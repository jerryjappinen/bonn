import isString from 'lodash-es/isString'

import parseIsoDuration from './parseIsoDuration'

export default (stringOrParsed) => {
  const d = isString(stringOrParsed) ? parseIsoDuration(stringOrParsed) : stringOrParsed

  let total = 0

  if (d.seconds) {
    total += d.seconds
  }

  if (d.minutes) {
    total += (60 * d.minutes)
  }

  if (d.hours) {
    total += (60 * 60 * d.hours)
  }

  if (d.days) {
    total += (60 * 60 * 24 * d.days)
  }

  if (d.weeks) {
    total += (60 * 60 * 24 * 7 * d.weeks)
  }

  if (d.months) {
    total += (60 * 60 * 24 * 30 * d.months)
  }

  if (d.years) {
    total += (60 * 60 * 24 * 30 * 365 * d.years)
  }

  return d.signMultiplier * total
}
