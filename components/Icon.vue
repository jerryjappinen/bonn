<template>
  <span class="c-icon">
    <slot class="c-icon-svg" />
  </span>
</template>

<style lang="scss">

.c-icon {
  @include transition-properties-common;
  @include transition-fast;

  @include flex;
  @include inline-flex;
  width: 1em;
  height: 1em;

  // svg {
  //   width: 1em;
  //   height: 1em;
  // }

}

</style>
