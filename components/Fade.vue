<script setup>
defineProps({
  mode: {
    default: 'out-in'
  }
})
</script>

<template>
  <transition
    :mode="mode === 'simultaneous' ? undefined : mode"
    name="transition-fade"
  ><slot /></transition>
</template>

<style lang="scss">
.transition-fade-enter-active,
.transition-fade-leave-active {
  // opacity: 1;
  transition-property: opacity;
  transition-duration: 0.5s;
}

.transition-fade-enter-from,
.transition-fade-leave-to {
  opacity: 0;
}
</style>
