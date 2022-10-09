<script setup>
import { ref, computed, unref, onMounted, onBeforeUpdate } from 'vue'

import trim from 'lodash-es/trim'

import Prism from 'prism-es6/prism.js'

import toJson from '../util/toJson'

const props = defineProps({

  code: {
    type: String,
    required: true
  },

  lang: {
    type: String,
    default: 'javascript'
  },

  jsonify: {
    type: Boolean,
    default: false
  },

  trim: {
    type: Boolean,
    default: undefined
  },

  dark: {
    type: String,
    default: undefined
  }

})

const codeBlock = ref(null)

const shouldTrim = computed(() => {
  const trimProp = unref(props.trim)
  return !!(trimProp === undefined || trimProp)
})

const stringify = (input) => {
  let value = unref(input)

  if (unref(props.jsonify)) {
    value = toJson(value)
  }

  if (shouldTrim.value) {
    return trim(value)
  }

  return value
}
const highlight = () => {
  Prism.highlightElement(codeBlock.value, true)
}

onMounted(highlight)
onBeforeUpdate(highlight)

</script>

<template>
  <code
    ref="codeBlock"
    :class="{
      ['language-' + lang]: lang,
      'prism-dark': dark
    }"
    class="c-highlighted-code prism"
  >{{ stringify(code.replace(/^[\r\n\s]*|[\r\n\s]*$/g, '')) }}</code>
</template>

<style lang="scss">

// NOTE: CSS is set in scss/utils/prism.scss
// Load this file globally or in your component:
// @import 'bonn/scss/util/prism.scss';

</style>
