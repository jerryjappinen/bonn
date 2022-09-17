<script setup>
defineProps({
  mode: {
    default: 'out-in'
  }
})
</script>

<template>
  <transition :mode="mode === 'simultaneous' ? undefined : mode"><slot /></transition>
</template>
