<script setup>
import Textfield from './Textfield.vue'
</script>

<template>
  <Textfield class="c-styled-textfield" />
</template>

<style lang="scss">

// NOTE: this could also be confined in component class name
// But then overriding it will be more laborious
// :root {
//   --c-styled-textfield-border-width: 1.5px;
//   --c-styled-textfield-radius: 1.5px;
// }

.c-styled-textfield {
  border-width: var(--c-styled-textfield-border-width, var(--control-border-width, 1px));
  border-radius: var(--c-styled-textfield-radius, var(--control-radius));

  .c-textfield-input {
    @include pad-tight;
  }
}

</style>
