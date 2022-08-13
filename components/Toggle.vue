<script setup>
// Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows
import Set from './Set'

import useModelValue from '../composables/useModelValue'

const props = defineProps({
  disabled: {},
  block: {},
  button: {},

  // Have to define props here
  // Type can change, but name is predefined by Vue
  // Ideally I'd just pass the options to composable, which would define the prop
  modelValue: {
    type: Boolean,
    required: true
  }
})

// This event name is set in Vue
// Why do I have to define it? Twice?
const emit = defineEmits('update:modelValue')

// I only saved the computed definition now
// A little less duplication but doesn't seem ideal
const value = useModelValue(props.modelValue)
</script>

<template>
  <Set
    class="c-toggle control"
    :class="{
      'c-toggle-on': value,
      'c-toggle-off': !value,
      'c-toggle-enabled': !disabled,
      'c-toggle-disabled': disabled,
      'c-toggle-inline': !block
    }"
    :to="!value"
    :block="block"
    :button="button"
    v-model="value"
  ><slot /></Set>
</template>

<style lang="scss">

.c-toggle-inline {
  display: inline-block;
}

</style>
