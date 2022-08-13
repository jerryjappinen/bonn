<script setup>
import { computed } from 'vue'

const props = defineProps({

  value: {
    type: Number,
    default: 0
  },

  min: {
    type: Number,
    default: 0
  },

  max: {
    type: Number,
    default: 100
  },

  transition: {
    type: Boolean,
    default: true
  }

})

const float = computed(() => {
  return (props.value - props.min) / Math.abs(props.max - props.min)
})

const normalizedFloat = computed(() => {
  return Math.max(0, Math.min(1, float))
})

const percentage = computed(() => {
  return 100 * normalizedFloat
})
</script>

<template>
  <div
    class="c-progress-bar"
    :class="{
      'c-progress-bar-transition': transition,
      'c-progress-bar-no-transition': !transition
    }"
  >
    <div
      class="c-progress-bar-fill"
      :class="{
        'c-progress-bar-fill-transition': transition,
        'c-progress-bar-fill-no-transition': !transition
      }"
      :style="{
        transform: 'translateX(' + percentage + '%)'
      }"
    />

    <div class="c-progress-bar-track" />
  </div>
</template>

<style lang="scss">

.c-progress-bar {
  @include relative;
  @include no-overflow;
  height: 4px;
}

.c-progress-bar-track {
  @include fill;
  z-index: 1;
  background-color: currentColor;
  opacity: 0.2;
}

.c-progress-bar-fill {
  @include fill;
  left: auto;
  right: 100%;
  z-index: 2;
  background-color: currentColor;

  @include transition-fast;
}

.c-progress-bar-fill-no-transition {
  @include transition-properties-style;
}

.c-progress-bar-fill-transition {
  @include transition-properties-common;
}

</style>
