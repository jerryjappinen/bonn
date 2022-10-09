<script setup>
import { computed, unref } from 'vue'

import { astToHtmlString } from '@graphcms/rich-text-html-renderer'

const props = defineProps({
  content: {
    type: Object,
    required: true
  },

  references: {
    type: Object,
    default: undefined
  },

  assetRenderers: {
    type: Object,
    default: undefined
  },

  htmlRenderers: {
    type: Object,
    default: undefined
  },

  linkRenderers: {
    type: Object,
    default: undefined
  },

  renderers: {
    type: Object,
    default: undefined
  }
})

const html = computed(() => {
  return astToHtmlString({
    content: props.content,
    references: props.references,

    // https://www.npmjs.com/package/@graphcms/rich-text-react-renderer
    renderers: {

      bold (props) {
        return `<strong>${props.children}</strong>`
      },

      // Different custom renderer types
      ...(unref(props.htmlRenderers) || {}),
      Asset: (unref(props.assetRenderers) || {}),
      link: {
        ...(unref(props.linkRenderers) || {})
      },
      embed: {
        ...(unref(props.renderers) || {})
      }
    }
  })
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="c-rich-text"
    v-html="html"
  />
</template>
