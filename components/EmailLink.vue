<script setup>
import { computed } from 'vue'

import replaceAll from '../util/replaceAll'

const props = defineProps({

  to: {
    type: String,
    required: true
  },

  external: {
    default: false
  },

  subject: {
    type: String,
    required: false
  },

  body: {
    type: String,
    required: false
  }

})



const href = computed(() => {
  const params = []

  if (props.subject) {
    params.push('subject=' + props.subject)
  }

  if (props.body) {
    params.push('body=' + replaceAll(props.body, '\n', '%0D%0A').trim())
  }

  return 'mailto:' + props.to + (params.length ? '?' + params.join('&') : '')
})



const bindings = computed(() => {
  if (props.external) {
    return {
      rel: 'nofollow noopener',
      target: '_blank'
    }
  }

  return null
})
</script>

<template>
  <a
    class="c-email-link"
    v-bind="bindings"
    :href="href"
  ><slot /></a>
</template>
