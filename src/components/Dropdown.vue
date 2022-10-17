<script setup>
import { computed, unref } from 'vue'

import includes from 'lodash-es/includes'
import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'

import IconChevronDown from '../icons/ChevronDown.svg'

import Icon from './Icon.vue'

const optionIsGroup = (option) => {
  return isArray(option.value)
}

const mapToValues = (options) => {
  let values = []

  // Each option
  options.forEach((option) => {
    if (optionIsGroup(option)) {
      values = values.concat(mapToValues(option.value))
    } else {
      values.push(option.value)
    }
  })

  return values
}

const emit = defineEmits([
  'update:modelValue'
])

const props = defineProps({

  // [
  //   {
  //     label: 'Foo Bar'
  //     value: 'foobar'
  //   },
  //   {
  //     label: 'Group'
  //     value: [
  //       {
  //         ...
  //       }
  //     ]
  //   }
  // ]

  options: {
    type: Array,
    default () {
      return []
    }
  },

  modelValue: {
    type: String,
    default: null
  },

  placeholder: {
    type: [Number, String],
    default: null
  },

  inline: {
    type: Boolean,
    default: false
  },

  disabled: {
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

const normalizedOptions = computed(() => {
  const options = unref(props.options)

  return options.map((option) => {
    if (isPlainObject(option)) {
      return option
    }

    // If only values was passed as strings, use them also as labels
    return {
      label: option,
      value: option
    }
  })
})

// FIXME: not recursive
const values = computed(() => {
  return mapToValues(normalizedOptions.value)
})

const hasSelected = computed(() => {
  return !!(value.value && includes(values.value, value.value))
})
</script>

<template>
  <span
    class="c-dropdown"
    :class="{
      'c-dropdown-disabled': !!disabled,
      'c-dropdown-inline': !!inline,
      'c-dropdown-block': !inline
    }"
  >
    <select
      v-model="value"
      :disabled="!!disabled"
      class="c-dropdown-select"
    >
      <template v-for="(option, i) in normalizedOptions">

        <!-- Nested group -->
        <!-- FIXME: would be nice if this was actually recursive without duplication -->
        <optgroup
          v-if="optionIsGroup(option)"
          :key="'group-' + i"
          :label="option.label"
        >
          <option
            v-for="(groupOption, j) in option.value"
            :key="j"
            :value="groupOption.value"
            :disabled="groupOption.disabled"
          >
            {{ groupOption.label }}
          </option>
        </optgroup>

        <!-- Value directly in the list -->
        <option
          v-else
          :key="'option-' + i"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>

      </template>

    </select>

    <span
      v-if="placeholder && !hasSelected"
      class="c-dropdown-placeholder"
    >
      {{ placeholder }}
    </span>

    <Icon class="c-dropdown-icon">
      <slot name="icon">
        <IconChevronDown />
      </slot>
    </Icon>

  </span>
</template>

<style lang="scss">

.c-dropdown,
.c-dropdown-select,
.c-dropdown-icon {
  @include relative;
}

.c-dropdown-select,
.c-dropdown-icon {
  @include transition-fast;
  @include transition-properties-common;
}

.c-dropdown {
  @include pointer;
}

.c-dropdown-inline {
  @include inline-block;
}

.c-dropdown-block {
  @include block;
}

.c-dropdown-select {
  @include border-box;
  @include block;
  @include pointer;
  width: 100%;
  padding-right: 2em;
  margin-right: -1em;
  z-index: 1;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::-ms-expand {
    display: none;
  }

}

.c-dropdown-placeholder {
  @include discreet;
  @include absolute;
  @include keep-vertical-center;
  @include ellipsis;
  max-width: 100%;
  z-index: 1;
}

.c-dropdown-icon {
  @include absolute;
  width: 1em;
  height: 1em;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  z-index: 2;
  pointer-events: none;
}

</style>
