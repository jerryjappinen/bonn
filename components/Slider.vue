<script setup>
import { ref, computed, unref } from 'vue'

// https://www.npmjs.com/package/vue3-slider
import Vue3Slider from "vue3-slider"

const props = defineProps({

  modelValue: {
    type: Number,
    required: true
  },

  min: {
    type: Number,
    default: 0
  },

  max: {
    type: Number,
    default: 100
  },

  step: {
    type: Number,
    default: 1
  },

  tooltip: {
    type: [Boolean, String],
    default: true
  },

  // Callback that formats the visible text in tooltip
  // Receives the value as a parameter
  formatTooltip: {
    type: Function,
    default: null
  },

  // flipTooltip: {
  //   type: Boolean,
  //   default: false
  // },

  width: {
    type: Number,
    default: null
  },

  thickness: {
    type: Number,
    default: 4
  },

  vertical: {
    type: Boolean,
    default: false
  },

  circular: {
    type: Boolean,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  }

})

const emit = defineEmits([
  'change',
  'drag',
  'drag-start',
  'drag-end',
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

// https://www.npmjs.com/package/vue3-slider#user-content-props
const options = computed(() => {
  const tooltip = unref(props.tooltip)
  const circular = unref(props.circular)
  const orientation = unref(props.vertical)
    ? 'vertical'
    : circular || circular === 0
      ? 'circular'
      : 'horizontal'

  const opts = {
    disabled: props.disabled,
    max: props.max,
    min: props.min,
    limit: undefined,
    step: props.step,
    tooltip: !!tooltip,
    tooltipText: typeof tooltip === 'string' ? tooltip : undefined,
    formatTooltip: props.formatTooltip,
    orientation,

    alwaysShowHandle: true,
    repeat: false,
    sticky: false,
    flip: false,
    flipTooltip: false,

    // User can pass offset in the circular parameter
    circleOffset: circular || 0,

    // Style
    width: circular ? (width || 80) : width, // default to absolute width with circular style
    height: props.thickness,
    handleScale: null, // magnification on hover
    color: '#000',
    trackColor: '#ccc',
    tooltipColor: '#000',
    tooltipTextColor: '#fff',
  }

  return opts
})



// Event handlers

const onChange = () => {
  emit('change')
}

const onDrag = () => {
  emit('drag')
}

const onDragStart = () => {
  mouseDown.value = true
  emit('drag-start')
}

const onDragEnd = () => {
  mouseDown.value = false
  emit('drag-end')
}
</script>

<template>
  <Vue3Slider
    :class="{
      'control-disabled': disabled,
      'control-enabled': !disabled,
      'control-mouse-down': mouseDown
    }"
    class="c-slider control"
    @change="onChange"
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
    @dragging="onDrag"
    v-model="value"
    v-bind="options"
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
