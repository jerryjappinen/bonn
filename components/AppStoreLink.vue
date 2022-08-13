<script setup>
import { computed } from 'vue'

import AppStoreBadge from './AppStoreBadge'
import ExternalLink from './ExternalLink'

const props = defineProps({
  refer: {},
  here: {},
  light: {},

  appId: {
    type: [Number, String],
    required: true
  }
})

const href = computed(() => {
  return props.appId
    ? `https://itunes.apple.com/us/app/ab-classic/${props.appId}?mt=8`
    : null
})
</script>

<template>
  <ExternalLink
    class="c-app-store-link"
    :href="href"
    :here="here"
    :refer="refer"
  >
    <slot>
      <AppStoreBadge
        class="c-app-store-link-badge"
        :light="light"
      />
    </slot>
  </ExternalLink>
</template>
