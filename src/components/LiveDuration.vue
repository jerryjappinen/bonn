<script setup>
import useTime from '../src/composables/useTime'

import Duration from './Duration.vue'

const time = useTime()

const endDate = time.current
</script>

<template>
  <Duration
    class="c-live-duration"
    :end-date="endDate"
  />
</template>
