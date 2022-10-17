<script setup>
import { computed } from 'vue'

const props = defineProps({

  href: {
    type: String,
    default: null
  },

  here: {
    type: Boolean,
    default: false
  },

  refer: {
    type: Boolean,
    default: false
  }

})

const bind = computed(() => {
  const attributes = {
    rel: 'nofollow noopener'
  }

  if (!props.here) {
    attributes.target = '_blank'
  }

  if (!props.refer) {
    attributes.rel += ' noreferrer'
  }

  return attributes
})
</script>

<template>
  <a
    :href="href"
    class="c-external-link"
    v-bind="bind"
  ><slot /></a>
</template>
