<script setup>
import { computed } from 'vue'

import MarkdownIt from 'markdown-it'

// https://github.com/markdown-it/markdown-it
const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false
})

const props = defineProps({
  markdown: {
    type: String,
    required: true
  },

  inline: {
    type: Boolean,
    default: false
  }
})



const bodyHtml = computed(() => {
  body
    ? props.inline
      ? markdownParser.renderInline(props.body)
      : markdownParser.render(props.body)
    : null
})

const component = computed(() => {
  return props.inline ? 'span' : 'div'
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <component
    :is="component"
    class="c-markdown"
  >

    <component
      :is="component"
      v-if="bodyHtml"
      class="c-markdown-content c-markdown-body"
      v-html="bodyHtml"
    />

    <component
      :is="component"
      v-else
      class="c-markdown-content c-markdown-placeholder"
    >
      <slot />
    </component>

  </component>
</template>
