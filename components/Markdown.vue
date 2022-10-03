<script setup>
import { computed, unref } from 'vue'

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
    default: null
  },

  inline: {
    type: Boolean,
    default: false
  }
})



const bodyHtml = computed(() => {
  const markdown = unref(props.markdown)

  markdown
    ? props.inline
      ? markdownParser.renderInline(markdown)
      : markdownParser.render(markdown)
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
