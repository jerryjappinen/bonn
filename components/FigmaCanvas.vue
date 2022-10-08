<script setup>
import { computed, unref } from 'vue'

import isAbsoluteUrl from '../util/isAbsoluteUrl'

const props = defineProps({

  file: {
    type: String,
    required: true
  },

  node: {
    type: [Number, String],
    default: undefined
  }

})

const src = computed(() => {
  const file = unref(props.file)
  const node = unref(props.node)
  let url = ''

  if (isAbsoluteUrl(file)) {
    url = file
  } else {
    url = 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F' + file
  }

  if (node) {
    url += '%2F%3Fnode-id%3D' + node
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
