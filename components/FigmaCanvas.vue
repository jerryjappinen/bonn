<script setup>
import { computed } from 'vue'

import isAbsoluteUrl from '../util/isAbsoluteUrl'

const props = defineProps({
  file: {
    type: String,
    required: true
  },

  node: {
    type: [Number, String],
    required: false
  }
})



const src = computed(() => {
  let url = ''

  if (isAbsoluteUrl(props.file)) {
    url = props.file
  } else {
    url = 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F' + props.file
  }

  if (props.node) {
    url += '%2F%3Fnode-id%3D' + props.node
  }

  return url
})
</script>

<template>
  <iframe
    :src="src"
    class="c-figma-canvas"
    allowfullscreen
  />
</template>
