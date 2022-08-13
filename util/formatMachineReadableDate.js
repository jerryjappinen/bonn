import { format } from 'date-fns'

import normalizeDate from './normalizeDate'

export default (date) => {
  return format(normalizeDate(date || new Date()), 'yyyy-MM-dd')
}
