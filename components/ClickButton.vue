<script setup>
import { resolveComponent } from 'vue'

import Fade from './Fade'
import Icon from './Icon'
import Spinner from './Spinner'

import { ref, computed, unref } from 'vue'

const props = defineProps({

  // Target link
  href: {
    type: String,
    default: null
  },

  to: {
    type: [String, Object],
    default: null
  },

  mailto: {
    type: String,
    default: null
  },

  tel: {
    type: String,
    default: null
  },

  external: {
    default: null
  },

  noIndex: {
    default: null
  },

  submit: {
    default: null
  },

  tab: {
    default: true
  },



  // State params

  block: {
    type: Boolean,
    default: null
  },

  center: {
    type: Boolean,
    default: null
  },

  loading: {
    type: Boolean,
    default: null
  },

  disabled: {
    type: Boolean,
    default: false
  },

  // This component includes no styling, but user can add style classes using this
  theme: {
    type: String,
    default: null
  }

})

const emit = defineEmits(['click'])

const htmlElementName = computed(() => {
  if (unref(props.href) || unref(props.mailto) || unref(props.tel)) {
    return 'a'
  }

  if (!unref(props.to)) {
    return 'button'
  }

  return null
})

const isRouterLink = computed(() => {
  return !htmlElementName.value
})

const is = computed(() => {
  if (htmlElementName.value) {
    return htmlElementName.value
  }

  // Dynamic element
  // return this.$nuxt ? resolveComponent('NuxtLink') : resolveComponent('RouterLink')
  try {
    return resolveComponent('NuxtLink')

  } catch (error) {
    // Nuxt is not available
  }

  return resolveComponent('RouterLink')
})



const vBind = computed(() => {
  const bindings = {}

  const tab = unref(props.tab)
  const mailto = unref(props.mailto)
  const tel = unref(props.tel)
  const submit = unref(props.submit)
  const to = unref(props.to)
  const href = unref(props.href)
  const noIndex = unref(props.noIndex)
  const external = unref(props.external)

  if (!tab) {
    bindings.tabindex = '-1'
  }

  // Email address
  if (mailto) {
    bindings.href = 'mailto:' + mailto

  // Phone link
  } else if (tel) {
    bindings.href = 'tel:' + tel

  // Button
  } else if (htmlElementName.value === 'button') {
    bindings.type = submit ? 'submit' : 'button'

  // Link
  } else {
    if (to) {
      bindings.to = to
    }

    if (href) {
      bindings.href = href
    }
  }

  if (noIndex || (external && noIndex !== false)) {
    bindings.rel = 'nofollow noopener noreferrer'
  }

  if (external) {
    bindings.target = '_blank'
  }

  return bindings
})

const classes = computed(() => {
  const theme = unref(props.theme)
  const loading = unref(props.loading)
  const disabled = unref(props.disabled)
  const block = unref(props.block)
  const center = unref(props.center)

  const classes = {
    'c-click-button-loading': loading,
    'c-click-button-not-loading': !loading,
    'c-click-button-disabled': disabled,
    'c-click-button-enabled': !disabled,
    'c-click-button-block': block,
    'c-click-button-center': center
  }

  // Include flat class names for theme
  if (theme) {
    for (const className in classes) {
      classes[className.replace('c-click-button', 'c-click-button-' + theme)] = classes[className]
    }
  }

  return classes
})

const onClick = (event) => {
  if (!unref(props.disabled)) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="is"
    v-bind="vBind"
    :disabled="props.disabled"
    :class="classes"
    class="c-click-button"
    @click="onClick"
  >

    <Fade>
      <Spinner
        v-if="props.loading"
        class="c-click-button-spinner"
      />
    </Fade>

    <!-- <Fade>
      <Icon v-if="$slots['icon-left'] && !props.loading">
        <slot
          name="icon-left"
          class="c-click-button-icon c-click-button-icon-left"
        />
      </Icon>
    </Fade>

    <Fade>
      <Icon v-if="$slots['icon-right'] && !props.loading">
        <slot
          name="icon-right"
          class="c-click-button-icon c-click-button-icon-right"
        />
      </Icon>
    </Fade> -->

    <span
      :class="{
        'c-click-button-content-block': props.block,
        'c-click-button-content-center': props.center
      }"
      class="c-click-button-content"
    >
      <slot />
    </span>

  </component>
</template>

<style lang="scss">

.c-click-button {
  @include relative;
  @include border-box;
  @include flex-center;
  @include inline-flex;
  line-height: inherit;
  border-width: 0;
  text-align: inherit;
  white-space: nowrap;
}

.c-click-button-block {
  @include flex;
  width: 100%;
}

.c-click-button-center {
  justify-content: center;
}

// .c-click-button-block-content {
//   align-items: center;
// }

// .c-click-button-content-center {
//   align-items: center;
// }

.c-click-button-content {
  @include border-box;
  @include relative;
  @include block;
  @include flex-center;
  @include flex;
  z-index: 2;

  @include transition-properties(opacity);
}

.c-click-button-spinner {
  @include keep-full-center;
  z-index: 1;
  height: 1em;
}

.c-click-button-icon {
  @include absolute;
  width: 1em;
  height: 1em;
  top: 50%;
  transform: translateY(-50%);
}

.c-click-button-icon-left {
  left: 0;

  ~ .c-click-button-content {
    padding-left: calc(1em + #{$pad-tight-horizontal});
  }

}

.c-click-button-icon-right {
  right: 0;

  ~ .c-click-button-content {
    padding-right: calc(1em + #{$pad-tight-horizontal});
  }

}



// Loading states

.c-click-button-not-loading {

  .c-click-button-content,
  .c-click-button-spinner {
    @include transition-slow;
  }

  .c-click-button-content {
    opacity: 1;
    @include transition-delay-slow;
  }

}

.c-click-button-loading {

  .c-click-button-content,
  .c-click-button-spinner {
    @include transition-fast;
  }

  .c-click-button-content {
    opacity: 0;
  }

  .c-click-button-spinner {
    opacity: 1;
    @include transition-delay-fast;
  }

}



// States

.c-click-button-disabled {
  @include inherit-cursor;
}

.c-click-button-enabled {
  @include pointer;

  &:active {
    // @include scale(0.975);
    @include translate-down(2px);
  }

}

</style>
