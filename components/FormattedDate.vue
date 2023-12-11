<script>
import { differenceInDays, formatRelative, isDate } from 'date-fns'

import isNumber from 'lodash-es/isNumber'
import upperFirst from 'lodash-es/upperFirst'

import formatDate from '../utils/formatDate'
import formatMachineReadableDate from '../utils/formatMachineReadableDate'

export default {

  props: {

    date: {
      type: [Number, String, Date],
      required: true
    },

    relative: {
      type: Boolean,
      default: true
    },

    absolutePrefix: {
      type: String,
      default: undefined
    },

    upperFirst: {
      type: Boolean,
      default: false
    }

  },

  computed: {

    normalizedDate () {
      return isDate(this.date)
        ? this.date
        : isNumber(this.date)
          ? new Date(this.date * 1000)
          : new Date(this.date)
    },

    diff () {
      return differenceInDays(this.normalizedDate, new Date())
    },

    isRelative () {
      return this.relative && Math.abs(this.diff) < 6
    },

    machineReadableDateString () {
      return formatMachineReadableDate(this.normalizedDate)
    },

    dateString () {
      if (this.isRelative) {
        return formatRelative(this.normalizedDate, new Date(), {
          weekStartsOn: 1,
          unit: 'hour'
        })
      }

      return formatDate(this.normalizedDate)
    },

    formattedDateString () {
      return this.upperFirst ? upperFirst(this.dateString) : this.dateString
    },

    prefix () {
      if (!this.isRelative && this.absolutePrefix) {
        return this.absolutePrefix
      }

      return null
    }

  }

}
</script>

<template>
  <time
    class="c-formatted-date"
    :datetime="machineReadableDateString"
  >{{ prefix ? prefix + ' ' : '' }}{{
    formattedDateString
  }}</time>
</template>
