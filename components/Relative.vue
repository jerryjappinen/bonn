<script setup>
const props = defineProps({
  inline: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <component
    :is="inline ? 'span' : 'div'"
    class="c-relative"
  ><slot /></component>
</template>

<style lang="scss">

.c-relative {
  @include relative;
}

</style>
