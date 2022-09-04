<script setup>
import { computed, unref } from 'vue'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

import toJson from '../util/toJson'

const props = defineProps({
  data: {
    default: null
  }
})

const content = computed(() => {
  const data = unref(props.data)

  if (isNumber(data) || isString(data)) {
    return data
  }

  return toJson(data)
})
</script>

<template>
  <pre class="c-dump"><code>{{ content }}</code></pre>
</template>
