<script setup>
import { computed, unref } from 'vue'

const props = defineProps({

  tel: {
    type: String,
    default: undefined
  },

  sms: {
    type: [Boolean, String],
    default: undefined
  },

  message: {
    type: String,
    default: undefined
  }

})

// https://stackoverflow.com/questions/6480462/how-to-pre-populate-the-sms-body-text-via-an-html-link
const href = computed(() => {
  const tel = unref(props.tel)
  const sms = unref(props.sms)
  const message = unref(props.message)

  return (sms || message ? 'sms' : 'tel') +
    ':' +
    (tel || sms) +
    (message ? '?' + message : '')
})
</script>

<template>
  <a
    class="c-phone-number"
    :href="href"
  ><slot /></a>
</template>
