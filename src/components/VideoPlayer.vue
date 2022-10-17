<script setup>
// FIXME: change this so user can pass multiple formats
import { computed, unref } from 'vue'

const props = defineProps({
  src: {
    type: [Array, String],
    default: null
  },

  type: {
    type: String,
    default: 'mp4'
  },

  // SRC attributes
  // mp4: {
  //   type: String,
  //   default: null
  // },
  // ogg: {
  //   type: String,
  //   default: null
  // },

  title: {
    type: String,
    default: null
  },

  poster: {
    type: String,
    default: null
  },

  mute: {
    type: Boolean,
    default: false
  },

  controls: {
    type: Boolean,
    default: false
  },

  autoplay: {
    type: Boolean,
    default: false
  },

  loop: {
    type: Boolean,
    default: false
  },

  // Support for lazy loading wrapper component
  lazy: {
    type: Boolean,
    default: false
  }

})

const mimeType = computed(() => {
  const type = unref(props.type)
  return (type.indexOf('/' < 0) ? 'video/' : '') + type
})

const sourceBinding = computed(() => {
  return {
    [props.lazy ? 'data-src' : 'src']: unref(props.src) || ''
  }
})

const bindings = computed(() => {
  const bind = {}
  const autoplay = unref(props.autoplay)

  if (autoplay) {
    bind.autoplay = true
    bind.playsinline = true
  }

  if (autoplay || unref(props.mute)) {
    bind.muted = true
  }

  if (unref(props.loop)) {
    bind.loop = true
  }

  if (unref(props.controls)) {
    bind.controls = true
  }

  return bind
})
</script>

<template>
  <video
    v-bind="bindings"
    class="c-video-player
    c-video-player-video"
    :title="title"
    :poster="poster"
  >
    <source
      v-bind="sourceBinding"
      :type="mimeType"
    >
    <img
      v-if="poster"
      :src="poster"
      :title="title"
      :alt="title"
    >
  </video>
</template>
