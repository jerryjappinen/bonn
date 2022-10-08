<script setup>
import { computed } from 'vue'

import AppStoreBadge from './AppStoreBadge.vue'
import ExternalLink from './ExternalLink.vue'

const props = defineProps({
  // Passthrough props
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  refer: {},

  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  here: {},

  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
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
