<script setup>
import useTime from '../composables/useTime'

import Duration from './Duration'

const time = useTime()

const endDate = time.current
</script>

<template>
  <Duration
    class="c-live-duration"
    :end-date="endDate"
  />
</template>
