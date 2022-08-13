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

.c-ellipsis-loading {

  .c-ellipsis-bullet {
    $c-ellipsis-duration: 5s;
    $c-ellipsis-delay: 0.333s;

    @include animation(c-ellipsis-pulse, $c-ellipsis-duration);

    &:nth-child(1) {
      animation-delay: #{2 * $c-ellipsis-delay};
    }

    &:nth-child(2) {
      animation-delay: #{1 * $c-ellipsis-delay};
    }

  }

}
</style>
