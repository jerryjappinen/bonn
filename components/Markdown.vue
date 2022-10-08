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

  return markdown
    ? props.inline
      ? markdownParser.renderInline(markdown)
      : markdownParser.render(markdown)
    : null
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <component
    :is="inline ? 'span' : 'div'"
    class="c-markdown"
    :class="{
      'c-markdown-inline': inline,
      'c-markdown-block': !inline
    }"
  >
    <span
      v-if="bodyHtml && inline"
      class="c-markdown-content c-markdown-inline-content c-markdown-body c-markdown-inline-body"
      v-html="bodyHtml"
    />

    <div
      v-else-if="bodyHtml"
      class="c-markdown-content c-markdown-block-content c-markdown-body c-markdown-block-body"
      v-html="bodyHtml"
    />

    <component
      :is="inline ? 'span' : 'div'"
      v-else
      class="c-markdown-content c-markdown-placeholder"
      :class="{
        'c-markdown-inline-content': inline,
        'c-markdown-block-content': !inline,
        'c-markdown-inline-placeholder': inline,
        'c-markdown-block-placeholder': !inline
      }"
    >
      <slot />
    </component>
  </component>
</template>
