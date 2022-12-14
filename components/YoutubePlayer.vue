<script setup>
import { computed, unref } from 'vue'

const baseUrl = 'https://www.youtube.com/embed/'

const props = defineProps({
  video: {
    type: String,
    default: null
  },

  playlist: {
    type: Array,
    default: null
  },

  mute: {
    type: Boolean,
    default: false
  },

  autoplay: {
    type: Boolean,
    default: false
  },

  landscape: {
    type: Boolean,
    default: false
  },

  frame: {
    type: Boolean,
    default: true
  }
})

const firstVideoId = computed(() => {
  const video = unref(props.video)
  const playlist = unref(props.playlist)

  if (!video && playlist) {
    return playlist[0]
  }

  return video
})

const bindings = computed(() => {
  const bindings = {}

  if (unref(props.frame)) {
    bindings.allowfullscreen = true
  }

  return bindings
})

const queryParameters = computed(() => {
  const params = [
    'rel=0',
    'color=white',
    'playsinline=1',
    'disablekb=1',
    'enablejsapi=1',
    'modestbranding=1'
  ]

  if (unref(props.mute)) {
    params.push('mute=1')
  }

  if (unref(props.autoplay)) {
    params.push('autoplay=1')
    params.push('loop=1')
  }

  if (props.playlist && props.playlist.length > 1) {
    const playlist = unref(props.playlist)
    const finalList = unref(props.video) ? playlist : playlist.slice(1)

    params.push('playlist=' + finalList.join(','))
  }

  if (props.frame) {
    params.push('showinfo=1')
    params.push('controls=1')
  } else {
    params.push('showinfo=0')
    params.push('controls=0')
  }

  return params
})

const src = computed(() => {
  return baseUrl + firstVideoId.value + '?' + queryParameters.value.join('&')
})

</script>

<template>
  <iframe
    v-bind="bindings"
    :src="src"
    :class="{
      'c-youtube-player-landscape': !!landscape,
      'c-youtube-player-frame': !!frame
    }"
    type="text/html"
    class="c-youtube-player"
    width="1280"
    height="720"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    frameborder="0"
  />
</template>

<style lang="scss">

.c-youtube-player {
  @include no-overflow;
  max-height: 100%;
}

.c-youtube-player-landscape {
  @include landscape(280px);

  @include screen-over(375px) {
    @include landscape(320px);
  }

  @include screen-over(540px) {
    @include landscape(480px);
  }

  @include screen-over(640px) {
    @include landscape(500px);
  }

  // @include screen-over(768px) {
  //   @include landscape(640px);
  // }

  // @include screen-over(960px) {
  //   @include landscape(768px);
  // }

  // @include screen-over(1024px) {
  //   @include landscape(880px);
  // }

  // @include screen-over(1280px) {
  //   @include landscape(960px);
  // }

  @include full {
    @include landscape(464px);
  }

}

</style>
