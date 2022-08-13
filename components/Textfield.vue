<script>
import isArray from 'lodash-es/isArray'
import isNaN from 'lodash-es/isNaN'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

import Fade from './Fade'
import Icon from './Icon'

export default {
  emits: [
    'blur',
    'cancel',
    'focus',
    'update:modelValue'
  ],

  components: {
    Fade,
    Icon
  },

  props: {

    labelId: {
      default: null
    },

    icon: {
      type: String,
      default: null
    },

    type: {
      default: 'text'
    },

    clear: {
      default: false
    },

    undo: {
      default: false
    },

    name: {
      type: String,
      default: null
    },

    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#inappropriate-for-the-control
    autocomplete: {
      default: null
    },

    multiline: {
      default: false
    },

    placeholder: {
      type: String
    },

    modelValue: {
      type: [String, Number],
      required: true
    },

    required: {
      default: false
    },

    max: {
      default: null
    },

    min: {
      default: null
    },

    pattern: {
      default: null
    },

    hex: {
      default: null
    },

    inline: {
      default: false
    },

    disabled: {
      default: false
    }

  },

  data () {
    let originalValue = ''

    if (isString(this.modelValue)) {
      originalValue += this.modelValue

    } else if (isNumber(this.modelValue)) {
      originalValue = 0 + this.modelValue
    }

    return {
      isFocused: false,
      originalValue
    }
  },

  computed: {

    value: {
      get () {
        return this.modelValue
      },
      set (value) {

        if (this.type === 'number') {
          const parsed = parseFloat(value)

          if (isNumber(parsed) && !isNaN(parsed)) {
            return this.$emit('update:modelValue', parsed)
          }
        }

        return this.$emit('update:modelValue', value)
      }
    },

    isEmpty () {
      return !(this.value && this.value.length)
    },

    hasUndo () {
      return !!(this.undo || isNumber(this.undo) || isString(this.undo))
    },

    undoValue () {
      if (isNumber(this.undo) || isString(this.undo)) {
        return this.undo
      }
      return this.originalValue
    },

    normalizedAutocomplete () {
      let autocomplete = this.autocomplete

      if (isArray(autocomplete)) {
        autocomplete = autocomplete.join(' ')
      }

      return autocomplete
    },

    bindings () {
      const attributes = {}

      if (this.labelId) {
        attributes.id = this.labelId
      }

      return attributes
    },

    inputBindings () {
      const attributes = {}

      if (this.labelId) {
        attributes.id = this.labelId
      }

      if (this.max) {
        attributes[this.type === 'text' ? 'maxlength' : 'max'] = this.max
      }

      if (this.min) {
        attributes[this.type === 'text' ? 'minlength' : 'min'] = this.min
      }

      if (this.pattern) {
        attributes.pattern = this.pattern
      } else if (this.hex) {
        // https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
        attributes.pattern = '(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)'
      }

      return attributes
    }

  },

  methods: {

    focus () {
      this.$refs.input.focus()
    },

    blur () {
      this.$refs.input.blur()
    },

    onFocus (event) {
      this.isFocused = true
      this.$emit('focus', event)
    },

    onBlur (event) {
      this.isFocused = false
      this.$emit('blur', event)
    },

    selectAll () {
      this.$refs.input.select()
    },

    clearValue () {
      this.value = ''
    },

    onClearClick () {
      this.clearValue()
      this.focus()
    },

    onUndoClick () {
      this.value = this.undoValue
    },

    onEsc (event) {
      this.$emit('cancel', event)
      this.blur()
    }

  }
}
</script>

<template>
  <span
    class="c-textfield"
    :class="{
      ['c-textfield-' + (icon || '')]: !!icon,
      'c-textfield-inline': !!inline,
      'c-textfield-block': !inline,
      'c-textfield-multiline': !!multiline,
      'c-textfield-not-multiline': !multiline,
      'c-textfield-has-icon': !!icon,
      'c-textfield-empty': isEmpty,
      'c-textfield-filled': !isEmpty,
      'c-textfield-focused': isFocused,
      'c-textfield-disabled': disabled
    }"
  >

    <textarea
      v-if="multiline"
      ref="input"
      v-model="value"
      v-bind="bindings"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :required="!!required"
      :disabled="!!disabled"
      class="c-textfield-input"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.esc="onEsc"
    />

    <input
      v-else
      ref="input"
      v-model="value"
      v-bind="{
        ...bindings,
        ...inputBindings
      }"
      :type="type"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :required="!!required"
      :disabled="!!disabled"
      class="c-textfield-input"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.esc="onEsc"
    >

    <!-- FIXME: change class name and dimensions to dynamic width -->
    <slot class="c-textfield-icon" />

    <template v-if="clear && !multiline">

      <Fade>
        <span
          v-if="!isEmpty"
          class="c-textfield-button c-textfield-clear"
          @click="onClearClick"
        >
          <IconCross />
        </span>
      </Fade>

    </template>

    <template v-else-if="hasUndo && !multiline">

      <Fade>
        <span
          v-if="!isEmpty && value !== undoValue"
          class="c-textfield-button c-textfield-undo"
          @click="onUndoClick"
        >
          <IconUndo />
        </span>
      </Fade>

    </template>

  </span>
</template>

<style lang="scss">

.c-textfield {
  @include relative;
}

.c-textfield-inline {
  @include inline-block;
}

.c-textfield-block {
  @include block;
}

.c-textfield-button,
.c-textfield-icon {
  @include block;
  @include absolute;
  z-index: 2;
  width: 1em;
  height: 1em;
  line-height: 1;

  @include transform-from-top-center;
  @include transition-properties-common;
}

.c-textfield-icon {
  color: $grey;
  left: 0;
  @include transition-slow;
}

.c-textfield-button {
  @include pointer;
  @include round;
  right: 0.4em;
  padding: 0.25em;

  color: $dark;
  background-color: $white;

  @include transition-hover-active;

  .c-vector {
    @include block;
  }

  // &:focus,
  // &:hover {
  //   transform: scale(1.1);
  // }

  &:active {
    transform: translateY(2px);
  }

}

.c-textfield-multiline {
  .c-textfield-button,
  .c-textfield-icon {
    top: $pad-loose-vertical;
  }
}

.c-textfield-not-multiline {

  .c-textfield-button,
  .c-textfield-icon {
    top: 50%;
    transform: translateY(-50%);
  }

  .c-textfield-button {

    &:focus,
    &:hover {
      transform: translateY(-50%);
    }

    &:active {
      transform: translateY(-45%);
    }

  }

}

.c-textfield-filled {
  .c-textfield-icon {
    color: inherit;
    @include transition-fast;
  }
}



.c-textfield-input {
  @include relative;
  @include border-box;
  @include inherit-cursor;
  width: 100%;
  // outline: 0;
  z-index: 1;
  border-width: 0;
  line-height: inherit;
  background-color: transparent;

  @include transition-medium;
  @include transition-properties-common;

  &::placeholder {
    @include discreet;

    text-decoration: underline;
    text-decoration-color: transparent;

    @include transition-fast;
    @include transition-properties-common;
  }

  &:focus {
    + .c-textfield-icon {
      transform: scale(1) translateY(-50%);
    }
  }

  &:focus,
  &:hover {
    @include transition-fast;

    + .c-textfield-icon {
      @include transition-fast;
      color: inherit;
    }
  }

  // &:hover {
  //   &:not(:focus) {
  //     opacity: 0.5;
  //   }
  // }

}

.c-textfield-has-icon {
  .c-textfield-input {
    padding-left: calc(#{$pad-tight-horizontal} + 1em);
  }
}

</style>
