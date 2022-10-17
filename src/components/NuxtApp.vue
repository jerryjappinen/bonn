<script setup>
// Poor man's app lifecycle handling
import { onMounted } from 'vue'
import isClient from '../src/util/isClient'

// NOTE: this should be available runtime
// import { NuxtLayout, NuxtPage } from 'nuxt'

const props = defineProps({

  onInit: {
    type: Function,
    default: null
  },

  onClientInit: {
    type: Function,
    default: null
  },

  onServerInit: {
    type: Function,
    default: null
  }

})

if (props.onInit) {
  props.onInit()
}

if (props.onServerInit && !isClient()) {
  props.onServerInit()
}

// Only called in client
onMounted(() => {
  if (props.onClientInit) {
    props.onClientInit()
  }
})
</script>

<template>
  <div>
    <slot>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </slot>
  </div>
</template>
