<!-- <script>
import { h } from 'vue'

export default {
  setup (props, { slots }) {
    const className = 'c-icon'

    console.log('slots.default', slots)

    const children = slots.default()

    if (children && children.length) {
      children.forEach((child) => {
        console.log('child', child)
        if (child.el) {
          child.el.classlist.add(className)
        }
      })
    }

    return () => h(slots.default)
  }
}
</script> -->

<template>
  <span class="c-icon">
    <slot class="c-icon-svg" />
  </span>
</template>

<!-- FIXME: would be great to get rid of this wrapper element -->
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
