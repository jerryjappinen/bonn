<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  disabled: {},

  block: {
    type: Boolean,
    default: false
  },

  button: {
    type: Boolean,
    default: false
  }

})

const mouseDown = ref(false)

const component = computed(() => {
  return props.button
    ? 'button'
    : props.block
      ? 'div'
      : 'span'
})



const onMouseDown = () => {
  mouseDown.value = true
}

const onMouseUp = () => {
  mouseDown.value = false
}

const onClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
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
  ><slot /></component>
</template>

<style lang="scss">

.c-click-inline {
  @include inline-block;
}

</style>
