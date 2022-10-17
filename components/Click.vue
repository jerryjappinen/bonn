<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  disabled: {
    type: Boolean,
    default: undefined
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

const component = computed(() => {
  return props.button
    ? 'button'
    : props.block
      ? 'div'
      : 'span'
})

const onClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
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
    class="c-click control"
    :class="{
      'c-click-enabled': !disabled,
      'c-click-disabled': disabled,
      'c-click-inline': !block,
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

.c-click-inline {
  @include inline-block;
}

</style>
