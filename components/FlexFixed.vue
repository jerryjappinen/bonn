<template>
  <div class="c-flex-fixed">
    <slot />
  </div>
</template>

<style lang="scss">
.c-flex-fixed {
  @include flex-fixed;
}
</style>
