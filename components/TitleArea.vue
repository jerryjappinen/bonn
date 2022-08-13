<script setup>
defineProps({

  rhythm: {
    type: Boolean,
    default: false
  },

  push: {
    type: Boolean,
    default: false
  }

})
</script>

<template>
  <div class="c-title-area" :class="{
      'c-title-area-rhythm': rhythm,
      'c-title-area-push': push,
      'no-rhythm': !rhythm
    }">

    <!--
      Usage: https://vuejs.org/guide/components/slots.html
      <img v-slot:left />
      or:
      <img #left />
    -->
    <div
      v-if="$slots.left && $slots.left.length"
      class="c-title-area-left"
    >
      <slot name="left" />
    </div>

    <div class="c-title-area-main">
      <slot />
    </div>

    <!-- <img #right /> -->
    <div
      v-if="$slots.right && $slots.right.length"
      class="c-title-area-right"
    >
      <slot name="right" />
    </div>

  </div>
</template>

<style lang="scss">
.c-title-area {
  @include flex;
  @include flex-center;
  @include relative;
}

.c-title-area-push {
  @include push-vertical;
}

.c-title-area-main {
  @include flex-fluid;
  @include relative;
}

// We need to do this so things appear centered when using rhythm
.c-title-area-rhythm {
  @include push-tight-top-even;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @include push-tight-vertical-even;
  }
}

.c-title-area-left {
  @include push-pad-right;
}

.c-title-area-left,
.c-title-area-right {
  @include flex-fixed;
  @include relative;
}
</style>
