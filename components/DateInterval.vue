<script>
import { isDate } from 'date-fns'

import formatDate from '../utils/formatDate'
import formatDateInterval from '../utils/formatDateInterval'
import formatMachineReadableDate from '../utils/formatMachineReadableDate'

export default {

  props: {

    startDate: {
      type: [String, Date],
      required: true
    },

    endDate: {
      type: [String, Date],
      default: null
    }

  },

  computed: {

    normalizedPassedStartDate () {
      return isDate(this.startDate) ? this.startDate : new Date(this.startDate)
    },

    normalizedPassedEndDate () {
      if (this.endDate) {
        return isDate(this.endDate) ? this.endDate : new Date(this.endDate)
      }
      return null
    },

    // Allow passing dates in either order

    datesAreFlipped () {
      return !!(
        this.normalizedPassedEndDate &&
        this.normalizedPassedEndDate < this.normalizedPassedStartDate
      )
    },

    earlierDate () {
      return this.datesAreFlipped ? this.normalizedPassedEndDate : this.normalizedPassedStartDate
    },

    laterDate () {
      return this.datesAreFlipped ? this.normalizedPassedStartDate : this.normalizedPassedEndDate
    },

    // diff () {
    //   return differenceInDays(this.earlierDate, this.laterDate)
    // },

    machineReadableEarlierDateString () {
      return formatMachineReadableDate(this.earlierDate)
    },

    machineReadableLaterDateString () {
      return formatMachineReadableDate(this.laterDate)
    },

    isShownAsDuration () {
      if (
        this.laterDate &&
        this.machineReadableEarlierDateString !== this.machineReadableLaterDateString
      ) {
        return true
      }

      return false
    },

    dateString () {
      if (this.isShownAsDuration) {
        return formatDateInterval(this.earlierDate, this.laterDate)
      }

      return formatDate(this.earlierDate)
    }

  }

}
</script>

<template>
  <time
    class="c-date-interval"
    :datetime="machineReadableEarlierDateString"
  >
    {{ dateString }}
  </time>
</template>
