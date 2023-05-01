<script setup>
import { h } from 'vue'

// https://www.npmjs.com/package/contentful-rich-text-vue-renderer
// MARKS
import RichTextRenderer from 'contentful-rich-text-vue-renderer'

import getEntryType from 'contentful-util/src/getEntryType'
import { BLOCKS, INLINES } from 'contentful-util/src/richTextTypes'

// How to render custom components: https://jsfiddle.net/2rbxg1q9/
const props = defineProps({
  document: {
    type: Object,
    required: true
  },

  // Totally custom renderers
  customBlockRenderers: { type: Object, default: null },
  customInlineRenderers: { type: Object, default: null },
  customMarkRenderers: { type: Object, default: null },

  // Easily pass on components
  defaultEntryBlockComponent: { type: Object, default: null },
  defaultEntryInlineComponent: { type: Object, default: null },

  entryBlockComponents: { type: Object, default: () => { return {} } },
  entryInlineComponents: { type: Object, default: () => { return {} } }
})

// This is the renderer function that gets passed on to the library
const renderEmbeddedEntryWith = (component, node, key) => {
  const entry = node.data.target
  const contentType = getEntryType(entry)

  // These get passed on to the component
  const entryComponentProps = {
    key,
    // node,
    entry,
    contentType
  }

  return h(component, entryComponentProps)
}

// This same logic needs to be used for both inline and block elements
// The renderer that gets passed on to the library can be customized using this wrapper
const getEntryRenderer = (mapping, defaultComponent) => {
  return (node, key) => {
    const entryType = getEntryType(node.data.target)
    const component = mapping[entryType] || defaultComponent

    if (component) {
      return renderEmbeddedEntryWith(component, node, key)
    }

    // How to not render anything?
    return undefined
  }
}

// Totally custom renderers can be passed through
const nodeRenderers = {
  ...(props.customBlockRenderers || {}),
  ...(props.customInlineRenderers || {}),

  // TODO: add
  // BLOCKS.EMBEDDED_ASSET
  // INLINES.ENTRY_HYPERLINK
  // INLINES.ASSET_HYPERLINK

  // Embedded entries get rendered using components
  [BLOCKS.EMBEDDED_ENTRY]: getEntryRenderer(props.entryBlockComponents, props.defaultEntryBlockComponent),
  [INLINES.EMBEDDED_ENTRY]: getEntryRenderer(props.entryInlineComponents, props.defaultEntryInlineComponent)
}

const markRenderers = {
  ...(props.customMarkRenderers || {})
}
</script>

<template>
  <RichTextRenderer
    :document="document"
    :node-renderers="nodeRenderers"
    :mark-renderers="markRenderers"
  />
</template>
