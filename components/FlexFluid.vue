<template>
  <div class="c-flex-fluid">
    <slot />
  </div>
</template>

<style lang="scss">
.c-flex-fluid {
  @include flex-fluid;
}
</style>
