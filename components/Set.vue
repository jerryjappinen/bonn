<script>
// Wrapper component to be used as a hit area. Using this makes it easier to style and control a hit area separately from the control visualisation inside it, for example in table rows

// This input is used by passing the value attribute with `.sync` modifier
// Internally this translates to two-way use of `value` prop
// State of the input is kept track of internally, and the result is $emitted to parent scope
// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

export default {
  emits: [
    'click',
    'update:modelValue'
  ],

  props: {
    modelValue: {},

    disabled: {
      type: Boolean,
      default: false
    },

    // The target value that modelValue will be set to when clicked
    to: {
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

  },

  data () {
    return {
      mouseDown: false
    }
  },

  computed: {

    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },

    component () {

      if (this.button) {
        return 'button'
      }

      if (this.block) {
        return 'div'
      }

      return 'span'
    },

    isOn () {
      return this.modelValue === this.to
    }

  },

  methods: {

    onMouseDown () {
      this.mouseDown = true
    },

    onMouseUp () {
      this.mouseDown = false
    },

    onClick () {
      if (!this.disabled) {
        this.$emit('click')
        this.value = this.to
      }
    }

  }

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
  ><slot /></component>
</template>

<style lang="scss">
.c-set-inline {
  @include inline-block;
}
</style>
