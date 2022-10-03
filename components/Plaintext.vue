<script setup>
import toPlainText from '../util/toPlainText'

defineProps({

  text: {
    type: String,
    default: null
  },

  block: {
    default: false
  }

})
</script>

<template>
  <component
    :is="block ? 'div' : 'span'"
    class="c-plaintext"
  >{{ text ? toPlainText(text || '') : '' }}</component>
</template>
