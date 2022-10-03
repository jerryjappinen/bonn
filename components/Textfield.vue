<script>
import isArray from 'lodash-es/isArray'
import isNaN from 'lodash-es/isNaN'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

import Fade from './Fade.vue'
import Icon from './Icon.vue'

import IconCross from '../icons/Cross.svg'
import IconUndo from '../icons/Undo.svg'

export default {
  emits: [
    'blur',
    'cancel',
    'focus',
    'update:modelValue'
  ],

  components: {
    Fade,
    Icon,
    IconCross,
    IconUndo
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
      default: ''
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

    hasLabel () {
      return this.$slots && this.$slots.default && this.$slots.default
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

    <span v-if="hasLabel" class="c-textfield-label">
      <slot />
    </span>

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

    <template v-if="clear && !multiline">

      <Fade>
        <button
          v-if="!isEmpty"
          class="c-textfield-button c-textfield-clear"
          @click="onClearClick"
        >
          <Icon>
            <IconCross />
          </Icon>
        </button>
      </Fade>

    </template>

    <template v-else-if="hasUndo && !multiline">

      <Fade>
        <button
          v-if="!isEmpty && value !== undoValue"
          class="c-textfield-button c-textfield-undo"
          @click="onUndoClick"
        >
          <Icon>
            <IconUndo />
          </Icon>
        </button>
      </Fade>

    </template>

  </span>
</template>

<style lang="scss">

:root {
  --c-textfield-button-color: currentColor;
  --c-textfield-button-background-color: var(--background-color);
}

.c-textfield {
  @include relative;
}

.c-textfield-inline {
  @include inline-flex;
}

.c-textfield-block {
  @include flex;
}

.c-textfield-button,
.c-textfield-label {
  @include block;
  z-index: 2;
  line-height: 1;

  @include transition-properties-common;
}

.c-textfield-label {
  @include relative;
  @include inline-flex;
  @include flex-center;
  white-space: nowrap;
}

.c-textfield-button {
  @include absolute;
  @include transform-from-top-center;

  @include pointer;
  @include round;
  right: 0.4em;
  width: 1em;
  height: 1em;
  padding: 0.25em;

  color: var(--c-textfield-button-color);

  // FIXME: this is needed so that the button can cover the underlying text
  // Ideally this would be more dynamic somehow
  background-color: var(--c-textfield-button-background-color);

  @include transition-interaction;

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

// FIXME: this should be more dynamic ideally
.c-textfield-multiline {

  .c-textfield-label,
  .c-textfield-button {
    top: var(--pad-loose-vertical);
  }

}

.c-textfield-not-multiline {
  @include flex-center;

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

  &:focus,
  &:hover {
    @include transition-fast;
  }

}

// FIXME: should be more dynamic (should support any content)
.c-textfield-has-icon {
  .c-textfield-input {
    padding-left: calc(var(--pad-tight-horizontal) + 1em);
  }
}

</style>
