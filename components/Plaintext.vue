<script setup>
import toPlainText from '../utils/toPlainText'

defineProps({

  text: {
    type: String,
    default: null
  },

  block: {
    type: Boolean,
    default: false
  }

})
</script>

<template>
  <component
    :is="block ? 'div' : 'span'"
    class="c-plaintext"
  >
    {{ text ? toPlainText(text || '') : '' }}
  </component>
</template>
