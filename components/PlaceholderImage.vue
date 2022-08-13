<script setup>
import { computed } from 'vue'

const props = defineProps({

  width: {
    type: Number,
    default: 200
  },

  height: {
    type: Number,
    default: null
  },

  dpi: {
    type: Number,
    default: 1
  }

})

const imageWidth = computed(() => {
  return props.width * props.dpi
})

const imageHeight = computed(() => {
  return (props.height || props.height) * props.dpi
})

const viewBox = computed(() => {
  return '0 0 ' + imageWidth + ' ' + (imageWidth || imageHeight)
})

const src = computed(() => {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="' +
    imageWidth +
    '" height="' +
    imageHeight +
    '" viewBox="' +
    viewBox +
    '" preserveAspectRatio="none"></svg>'
})
</script>

<template>
  <img
    :src="src"
    :width="width"
    :height="width || height"
    class="c-placeholder-image"
  >
</template>
