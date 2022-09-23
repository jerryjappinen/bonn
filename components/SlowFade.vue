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
    name="transition-slow-fade"
  ><slot /></transition>
</template>

<style lang="scss">

:root {
  --transition-slow-fade-duration: var(--transition-fast);
  --transition-slow-fade-enter-duration: var(--transition-slow-fade-duration);
  --transition-slow-fade-leave-duration: var(--transition-slow-fade-duration);
}

.transition-slow-fade-enter-active,
.transition-slow-fade-leave-active {
  // opacity: 1;
  transition-property: opacity;
}

.transition-slow-fade-enter-active {
  transition-duration: var(--transition-slow-fade-enter-duration);
}

.transition-slow-fade-leave-active {
  transition-duration: var(--transition-slow-fade-leave-duration);
}

.transition-slow-fade-enter-from,
.transition-slow-fade-leave-to {
  opacity: 0;
}

</style>
