<script setup>
import { computed } from 'vue'

// Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows
// FIXME: lose this extra layer
import Set from './Set.vue'

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  disabled: {},

  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  block: {},

  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
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
const emit = defineEmits([
  'update:modelValue'
])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <Set
    v-model="value"
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
    :disabled="disabled"
  >
    <slot />
  </Set>
</template>

<style lang="scss">

.c-toggle-inline {
  display: inline-block;
}

</style>
