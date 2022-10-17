<script setup>
defineProps({
  mode: {
    type: String,
    default: 'out-in'
  }
})
</script>

<template>
  <transition :mode="mode === 'simultaneous' ? undefined : mode">
    <slot />
  </transition>
</template>
