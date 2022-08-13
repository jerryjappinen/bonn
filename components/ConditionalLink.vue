<script>
export default {

  props: {

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
      type: Boolean,
      default: null
    },

    noIndex: {
      type: Boolean,
      default: null
    }

  },

  computed: {

    component () {

      if (this.href || this.mailto || this.tel) {
        return 'a'
      }

      if (this.to) {
        return this.$nuxt ? 'nuxt-link' : 'router-link'
      }

      return 'span'
    },

    isClickable () {
      return this.component !== 'span'
    },

    bindings () {
      const bindings = {}

      // Email address
      if (this.mailto) {
        bindings.href = 'mailto:' + this.mailto

      // Phone link
      } else if (this.tel) {
        bindings.href = 'tel:' + this.tel

      // Link
      } else {

        if (this.to) {
          bindings.to = this.to
        }

        if (this.href) {
          bindings.href = this.href
        }

      }

      if (this.external || this.noIndex) {
        bindings.rel = 'nofollow noopener'
      }

      if (this.external) {
        bindings.target = '_blank'
      }

      return bindings
    }

  }

}
</script>

<template>
  <component
    :is="component"
    v-bind="bindings"
    :class="{
      'c-conditional-link-clickable': isClickable,
      'c-conditional-link-not-clickable': !isClickable
    }"
    class="c-conditional-link"
  ><slot /></component>
</template>
