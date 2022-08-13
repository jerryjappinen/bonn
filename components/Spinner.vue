<script setup>
import { computed } from 'vue'

const props = defineProps({

  // Pixels
  width: {
    type: Number,
    default: 48
  },

  // In pixels, when displayed at 1:1 width
  strokeWidth: {
    type: Number,
    default: 4
  }

})

const viewBox = computed(() => {
  return '0 0 ' + props.width + ' ' + props.width
})

const strokeWidthValue = computed(() => {
  return props.strokeWidth + 'px'
})

const radius = computed(() => {
  return ((props.width / 2) - props.strokeWidth) + 'px'
})

const circlePosition = computed(() => {
  return (props.width / 2) + 'px'
})
</script>

<template>
  <svg class="c-spinner" :viewBox="viewBox" :width="width + 'px'" :height="width + 'px'" role="img" title="Loading...">
    <circle class="c-spinner-circle" :style="{
      transformOrigin: (width / 2) + 'px ' + (width / 2) + 'px 0',
      strokeDasharray: (3.14 * width) + 'px'
    }" :cx="circlePosition" :cy="circlePosition" :r="radius" :stroke-width="strokeWidthValue" />
  </svg>
</template>

<style lang="scss">

// Note: this won't adapt to spinner size
$c-spinner-circle-size: 48 !default;

.c-spinner-circle {
  fill: transparent;
  stroke: currentColor;

  stroke-dashoffset: 0;
  stroke-linecap: butt;

  animation-name: c-spinner-circle;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-timing-function: linear;
}

@keyframes c-spinner-circle {

  0% {
    stroke-dashoffset: (0.66 * $c-spinner-circle-size) * 1px;
    transform: rotate(0deg);
  }

  50% {
    stroke-dashoffset: (3.14 * $c-spinner-circle-size) * 1px;
    transform: rotate(720deg);
  }

  100% {
    stroke-dashoffset: (0.66 * $c-spinner-circle-size) * 1px;
    transform: rotate(1080deg);
  }

}
</style>
