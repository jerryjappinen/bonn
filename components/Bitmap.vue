<script setup>
import { computed } from 'vue'

const props = defineProps({

  // Not required, in order to support lazy loading images
  src: {
    type: String,
    default: null
  },

  title: {
    type: String,
    default: null
  },

  naturalWidth: {
    type: [Number, String],
    default: null
  },

  naturalHeight: {
    type: [Number, String],
    default: null
  }

})

const normalizedTitle = computed(() => {
  return props.title ? ('' + props.title).trim() : props.title
})
</script>

<template>
  <img
    :alt="normalizedTitle"
    :width="naturalWidth"
    :height="naturalHeight"
    :src="src"
    :title="normalizedTitle"
    class="c-bitmap"
  >
</template>
