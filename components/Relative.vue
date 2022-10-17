<template>
  <span class="c-relative"><slot /></span>
</template>

<style lang="scss">

.c-relative {
  @include relative;
  @include inline-block;
}

</style>
