<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <!-- NOTE: Need to keep this on one line to not add whitespace -->
  <span
    class="c-ellipsis"
    :class="{
      'c-ellipsis-loading': loading
    }"
  ><span class="c-ellipsis-bullet">.</span><span class="c-ellipsis-bullet">.</span><span class="c-ellipsis-bullet">.</span></span>
</template>

<style lang="scss">

:root {
  --c-ellipsis-duration: 5s;
  --c-ellipsis-delay: 0.333s;
}

.c-ellipsis-loading {

  .c-ellipsis-bullet {

    @include animation(c-ellipsis-pulse, var(--c-ellipsis-duration));

    &:nth-child(1) {
      animation-delay: calc(2 * var(--c-ellipsis-delay));
    }

    &:nth-child(2) {
      animation-delay: calc(1 * var(--c-ellipsis-delay));
    }

  }

}

@keyframes c-ellipsis-pulse {

0%,
40%,
100% {
  opacity: 1;
}

20% {
  opacity: 0;
}

}

</style>
