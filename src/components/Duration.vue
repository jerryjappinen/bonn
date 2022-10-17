<script setup>
import { differenceInCalendarDays } from 'date-fns'
import { computed, unref } from 'vue'

import formatDate from '../util/formatDate'
import normalizeDate from '../util/normalizeDate'

// NOTE: this element might print an empty <span />
// This is intentional:
// - we often don't want to print very short durations (0 or 1 days)
// - But we calculate the diff in this component, so parent won't know whether to render this
// - We could get to not printing anything by using a render function
const props = defineProps({

  date: {
    type: [Date, String],
    required: true
  },

  endDate: {
    type: [Date, String],
    default: undefined
  },

  prefix: {
    type: [Number, String],
    default: null
  },

  suffix: {
    type: [Number, String],
    default: null
  }

})

const normalizedDate1 = computed(() => {
  return normalizeDate(unref(props.date))
})

const normalizedDate2 = computed(() => {
  const endDate = unref(props.endDate)
  return endDate ? normalizeDate(endDate) : new Date()
})

const diff = computed(() => {
  return Math.abs(
    differenceInCalendarDays(normalizedDate1.value, normalizedDate2.value)
  )
})

const detailsString = computed(() => {
  if (diff.value) {
    const date1 = formatDate(normalizedDate1.value)
    const date2 = formatDate(normalizedDate2.value)
    return date1 + (date1 !== date2 ? ' – ' + date2 : '')
  }

  return null
})

const dateTimeString = computed(() => {
  const string = (diff.value ? diff.value : 1) + ' day' + (
    diff.value > 1
      ? 's'
      : ''
  )

  const prefix = unref(props.prefix)
  const suffix = unref(props.suffix)

  return [
    prefix || '',
    string,
    suffix || ''
  ].join('')
})

</script>

<template>
  <span
    class="c-duration"
    :data-tooltip="detailsString"
  >{{ dateTimeString }}</span>
</template>
