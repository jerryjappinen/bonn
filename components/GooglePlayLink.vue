<script setup>
import { computed } from 'vue'

import GooglePlayBadge from './GooglePlayBadge'
import ExternalLink from './ExternalLink'

const props = defineProps({
  light: {},

  package: {
    type: [Number, String],
    required: true
  }
})

const href = computed(() => {
  return props.package
    ? 'http://play.google.com/store/apps/details?id=' + props.package
    : null
})
</script>

<template>
  <ExternalLink
    class="c-google-play-link"
    :href="href"
  >
    <slot>
      <GooglePlayBadge
        class="c-google-play-link-badge"
        :light="light"
      />
    </slot>
  </ExternalLink>
</template>
