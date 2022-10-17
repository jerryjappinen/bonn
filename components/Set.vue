<script setup>
import { computed, ref, unref } from 'vue'

// Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows

// This input is used by passing the value attribute with `.sync` modifier
// Internally this translates to two-way use of `value` prop
// State of the input is kept track of internally, and the result is $emitted to parent scope
// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

const emit = defineEmits([
  'click',
  'update:modelValue'
])

const props = defineProps({
  modelValue: {
    type: undefined,
    required: true
  },

  disabled: {
    type: Boolean,
    default: false
  },

  // The target value that modelValue will be set to when clicked
  to: {
    type: undefined,
    default: true
  },

  block: {
    type: Boolean,
    default: false
  },

  button: {
    type: Boolean,
    default: false
  }

})

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const component = computed(() => {
  const button = unref(props.button)
  const block = unref(props.block)

  return button ? 'button' : block ? 'div' : 'span'
})

const isOn = computed(() => {
  const modelValue = unref(props.modelValue)

  return unref(modelValue) === unref(props.to)
})

const onClick = () => {
  if (!unref(props.disabled)) {
    emit('click')
    value.value = unref(props.to)
  }
}

// Control mouse handling
// FIXME: should be a composable

const mouseDown = ref(false)

const onMouseDown = () => {
  mouseDown.value = true
}

const onMouseUp = () => {
  mouseDown.value = false
}

</script>

<template>
  <component
    :is="component"
    class="c-set control"
    :class="{
      'c-set-on': isOn,
      'c-set-off': !isOn,
      'c-set-true': !!value,
      'c-set-false': !value,
      'c-set-enabled': !disabled,
      'c-set-disabled': disabled,
      'c-set-inline': !block,
      'control-disabled': disabled,
      'control-enabled': !disabled,
      'control-mouse-down': mouseDown
    }"
    @click="onClick"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <slot />
  </component>
</template>

<style lang="scss">

.c-set-inline {
  @include inline-block;
}

</style>
