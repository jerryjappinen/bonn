<script setup>
import eventHasAnyMetaKey from '../src/util/eventHasAnyMetaKey'
import linkIsInternal from '../src/util/linkIsInternal'
import nextTick from '../src/util/nextTick'

defineProps({

  discreet: {
    type: Boolean,
    default: false
  },

  lineBreaks: {
    type: Boolean,
    default: false
  }

})

// FIXME: replication
// FIXME: should be in a utility
const modifyExternalLink = (el) => {
  const originalRel = el.getAttribute('rel')
  const originalTarget = el.getAttribute('target')
  const desiredRel = 'nofollow'
  const desiredTarget = '_blank'

  if (originalRel !== desiredRel) {
    el.setAttribute('rel', desiredRel)
  }

  if (originalTarget !== desiredTarget) {
    el.setAttribute('target', desiredTarget)
  }

  // Return previous attributes after a delay
  nextTick(() => {
    if (originalRel !== desiredRel) {
      if (originalRel) {
        el.setAttribute('rel', originalRel)
      } else {
        el.removeAttribute('rel')
      }
    }

    if (originalTarget !== desiredTarget) {
      if (originalTarget) {
        el.setAttribute('target', originalTarget)
      } else {
        el.removeAttribute('target')
      }
    }
  })
}

// Temporarily make link external if user didn't press meta key
const onClick = (event) => {
  if (event.target.tagName === 'A') {
    if (!eventHasAnyMetaKey(event) && !linkIsInternal(event.target)) {
      modifyExternalLink(event.target)
    }
  }
}

</script>

<template>
  <div
    class="c-bodytext bodytext"
    :class="{
      'bodytext-discreet': discreet,
      'bodytext-with-line-breaks': lineBreaks,
      'c-bodytext-discreet': discreet,
      'c-bodytext-with-line-breaks': lineBreaks
    }"
    @click="onClick"
  >
    <slot />
  </div>
</template>
