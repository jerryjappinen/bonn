<script setup>
import { computed, unref } from 'vue'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

import toJson from '../src/util/toJson'

const props = defineProps({

  data: {
    type: undefined,
    default: null
  },

  raw: {
    type: Boolean,
    default: false
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
  <pre class="c-dump"><code>{{ raw ? data : content }}</code></pre>
</template>
