<script setup>
import { computed } from 'vue'

const props = defineProps({

  tel: {
    type: String,
    required: false
  },

  sms: {
    type: String,
    required: false
  },

  body: {
    type: String,
    required: false
  }

})

const href = computed(() => {
  return (props.sms || props.body ? 'sms' : 'tel') +
    ':' +
    props.tel +
    (props.body
      ? '?' + props.body
      : '')
})
</script>

<template>
  <a
    class="c-phone-number"
    :href="href"
  ><slot /></a>
</template>
