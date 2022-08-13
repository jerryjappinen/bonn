<script setup>
import useTime from '../composables/useTime'

import Duration from './Duration'

const time = useTime()

defineProps({
  date: {},
  prefix: {},
  suffix: {},
  cutoff: {}
})
</script>

<template>
  <Duration
    class="c-live-duration"
    :date="date"
    :end-date="time.current"
    :prefix="prefix"
    :suffix="suffix"
    :cutoff="cutoff"
  />
</template>
