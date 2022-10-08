<script setup>
import { computed, unref } from 'vue'

import isString from 'lodash-es/isString'

const props = defineProps({

  tel: {
    type: [Number, String],
    default: undefined
  },

  sms: {
    type: [Boolean, String],
    default: undefined
  }

})

// https://stackoverflow.com/questions/6480462/how-to-pre-populate-the-sms-body-text-via-an-html-link
const href = computed(() => {
  const tel = unref(props.tel)
  const sms = unref(props.sms)

  return (sms ? 'sms' : 'tel') +
    ':' +
    tel +
    (isString(sms) ? '?body=' + sms : '')
})
</script>

<template>
  <a
    class="c-phone-number"
    :href="href"
  ><slot /></a>
</template>
