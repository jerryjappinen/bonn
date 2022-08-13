<template>
  <span class="c-tag">
    <slot />
  </span>
</template>

<style lang="scss">
.c-tag {
  @include inline-block;
  @include radius-tight;
  @include pad-tight-horizontal;
  @include align-center;
  @include label;
  @include ellipsis;
}
</style>
