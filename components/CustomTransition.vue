<script>
// Wrapper component for reducing boilerplate with transition
export default {
  name: 'CustomTransition',

  props: {

    name: {
      type: String,
      default: null
    },

    mode: {
      type: String,
      required: false,
      default: 'out-in',

      // Accept empty string or any of the modes as input, in addition to empty values
      validator (value) {
        return [
          'out-in',
          'simultaneous',
          'in-out'
        ].indexOf(value) > -1
      }

    },

    appear: {},
    duration: {}

  },

  computed: {

    // NOTE
    // - Vue's default transition has no name, but it behaves like a simultaneous transition
    // - Here we have to convert the named mode we support in this custom component to null so that Vue defaults to is
    modeForVue () {
      return this.mode === 'simultaneous' ? null : this.mode
    }

  },

  methods: {

    getTransitionClassname (step) {
      return this.name ? 'transition-' + this.name + '-' + step : 'on-' + step
    }

  }

}
</script>

<template>
  <transition
    :name="'transition-' + name"
    :mode="modeForVue"
    :appear="appear"
    :duration="duration"

    :enter-from-class="getTransitionClassname('enter-from')"
    :enter-active-class="getTransitionClassname('enter-active')"
    :enter-to-class="getTransitionClassname('enter-to')"
    :leave-from-class="getTransitionClassname('leave-from')"
    :leave-active-class="getTransitionClassname('leave-active')"
    :leave-to-class="getTransitionClassname('leave-to')"
    :appear-from-class="getTransitionClassname('appear-from')"
    :appear-to-class="getTransitionClassname('appear-to')"
    :appear-active-class="getTransitionClassname('appear-active')"
  >
    <slot />
  </transition>
</template>
