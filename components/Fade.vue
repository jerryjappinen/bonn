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

:root {
  --transition-fade-duration: var(--transition-fast);
  --transition-fade-enter-duration: var(--transition-fade-duration);
  --transition-fade-leave-duration: var(--transition-fade-duration);
}

.transition-fade-enter-active,
.transition-fade-leave-active {
  // opacity: 1;
  transition-property: opacity;
}

.transition-fade-enter-active {
  transition-duration: var(--transition-fade-enter-duration);
}

.transition-fade-leave-active {
  transition-duration: var(--transition-fade-leave-duration);
}

.transition-fade-enter-from,
.transition-fade-leave-to {
  opacity: 0;
}

</style>
