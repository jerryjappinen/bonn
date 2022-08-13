<script setup>
import isNumber from 'lodash-es/isNumber'
import { ref, computed } from 'vue'

// https://nightcatsama.github.io/vue-slider-component/#/
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/lib/theme/default.scss'

const props = defineProps({

  modelValue: {
    type: Number,
    required: true
  },

  disabled: {
    type: Boolean,
    default: false
  },

  lazy: {
    type: Boolean,
    default: false
  },

  inverted: {
    type: Boolean,
    default: false
  },

  vertical: {
    type: Boolean,
    default: false
  },

  data: {
    type: [Array, Object],
    default: null
  },

  min: {
    type: Number,
    default: null
  },

  max: {
    type: Number,
    default: null
  },

  interval: {
    type: Number,
    default: null
  },

  tooltip: {
    type: [Boolean, String],
    default: true
  }

})

const emit = defineEmits([
  'update:modelValue'
])



const mouseDown = ref(false)

const value = computed({

  get () {
    return props.modelValue.value
  },

  set (value) {
    emit('update:modelValue', value)
  }

})

const options = computed(() => {
  const opts = {
    dotSize: 24,
    height: 4,
    duration: 0.15,
    dragOnClick: true,
    adsorb: true,
    tooltip: props.tooltip ? 'active' : 'none',
    tooltipPlacement: props.tooltip === true ? 'top' : props.tooltip,
    enableCross: false

    // dataLabel: 'label',
    // dataValue: 'value'
  }

  if (props.lazy) {
    opts.lazy = true
  }

  if (props.disabled) {
    opts.disabled = true
  }

  if (props.data) {
    opts.data = props.data
  }

  if (isNumber(props.min)) {
    opts.min = props.min
  }

  if (isNumber(props.min)) {
    opts.min = props.min
  }

  if (isNumber(props.max)) {
    opts.max = props.max
  }

  if (props.vertical) {
    opts.direction = 'ttb'
  }

  if (props.inverted) {
    if (props.vertical) {
      opts.direction = 'btt'
    } else {
      opts.direction = 'rtl'
    }
  }

  return opts
})



const onMouseDown = () => {
  mouseDown.value = true
}

const onMouseUp = () => {
  mouseDown.value = false
}
</script>

<template>
  <VueSlider
    class="c-slider control"
    :class="{
      'control-disabled': disabled,
      'control-enabled': !disabled,
      'control-mouse-down': mouseDown
    }"
    v-bind="options"
    v-model="value"
    v-on="{
      mouseup: onMouseUp,
      mousedown: onMouseDown
    }"
  />
</template>

<style lang="scss">

.c-slider {

  .vue-slider-dot-handle {
    @include shadow-tight;
    background-clip: padding-box;
    background-color: $white;
    border-width: 1px;
    border-color: translucent($very-dark);
  }

  .vue-slider-rail {
    background-color: translucent($very-dark);
  }

  .vue-slider-process {
    background-color: $very-dark;
  }

  .vue-slider-dot-tooltip-inner {
    border-color: $very-dark;
    background-color: $very-dark;
  }

}

</style>
