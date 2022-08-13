<script setup>
import { ref, computed } from 'vue'

import ExternalLink from './ExternalLink'
import Bitmap from './Bitmap'
import VideoPlayer from './VideoPlayer'

const props = defineProps({

  post: {
    type: Object,
    required: true
  },

  hd: {
    type: Boolean,
    default: false
  }

})



const videoElement = ref(null)

const isPortrait = computed(() => {
  return (props.post.images.standard_resolution.width < props.post.images.standard_resolution.height)
})

const isVideo = computed(() => {
  return props.post.type === 'video' && props.post.videos
})

const imageSrc = computed(() => {
  return props.hd
    ? props.post.images.low_resolution.url
    : props.post.images.standard_resolution.url
})

const videoSrc = computed(() => {
  return !isVideo
    ? null
    : props.hd
      ? props.post.videos.low_bandwidth.url
      : props.post.videos.standard_resolution.url
})

const title = computed(() => {
  return props.post.caption && props.post.caption.text
    ? props.post.caption.text
    : props.post.location && props.post.location.name
      ? props.post.location.name
      : props.post.user.full_name
})



const onVideoClick = () => {
  if (videoElement.value && videoElement.value.video.paused) {
    videoElement.value.video.play()
  } else {
    videoElement.value.video.pause()
  }
}
</script>

<template>
  <div
    :class="{
      'c-instagram-post-hd': hd,
      'c-instagram-post-portrait': isPortrait,
      'c-instagram-post-landscape': !isPortrait
    }"
    class="c-instagram-post"
  >

    <!-- Video -->
    <VideoPlayer
      v-if="isVideo"
      ref="videoElement"
      class="c-instagram-post-video"
      :src="videoSrc"
      :poster="imageSrc"
      playsinline
      autoplay
      muted
      loop
      @click="onVideoClick"
    />

    <!-- Image wrapped in a link -->
    <ExternalLink
      v-else
      class="c-instagram-post-image"
      :href="post.link"
    >
      <Bitmap
        class="c-instagram-post-image"
        :src="imageSrc"
        :title="title"
      />
    </ExternalLink>

  </div>
</template>

<style lang="scss">

.c-instagram-post {
  @include relative;
  @include no-overflow;
}

.c-instagram-post-link {
  @include block;
  @include fill-relative;
}

.c-instagram-post-image,
.c-instagram-post-video {
  @include keep-full-center;
}

.c-instagram-post-portrait {
  .c-instagram-post-image,
  .c-instagram-post-video {
    max-width: 100%;
    max-height: none;
  }
}

.c-instagram-post-landscape {
  .c-instagram-post-image,
  .c-instagram-post-video {
    max-width: none;
    max-height: 100%;
  }
}

</style>
