<script setup>
import HighlightedCode from './HighlightedCode.vue'

defineProps({
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  code: {},
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  lang: {},
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  trim: {},
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  dark: {},
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  jsonify: {},

  file: {
    type: String,
    default: null
  }
})
</script>

<template>
  <pre class="c-highlighted-pre"><div
    v-if="file"
    class="c-highlighted-pre-file"
  >{{ file }}</div><HighlightedCode
    :code="code"
    :lang="lang"
    :trim="trim"
    :dark="dark"
    :jsonify="jsonify"
  /></pre>
</template>

<style lang="scss">

.c-highlighted-pre {
  @include relative;
}

.c-highlighted-pre-file {
  @include discreet;
  @include small-font;
}

</style>
