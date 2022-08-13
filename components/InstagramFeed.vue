<script setup>
import InstagramPost from './InstagramPost'

defineProps({
  hd: {},

  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="c-instagram-feed">
    <div
      v-for="post in posts"
      :key="post.id"
      class="c-instagram-feed-item"
    >
      <InstagramPost
        :post="post"
        :hd="hd"
      />
    </div>
  </div>
</template>

<style lang="scss">

.c-instagram-feed {
  @include grid;
  @include grid-columns(2);
  @include grid-gap($buffer);

  @include tablet {
    @include grid-columns(4);
  }

  @include desktop {
    @include grid-columns(5);
  }

  @include hd {
    @include grid-columns(6);
  }

}

.c-instagram-feed-item {
  @include relative;
  @include square-grid-cell;
  @include no-overflow;

  .c-instagram-post {
    @include keep-full-center;
    z-index: 10;
    width: 104%;
    height: 104%;
  }

  .c-instagram-post-image,
  .c-instagram-post-video {
    min-width: 100%;
    min-height: 100%;
  }

}

</style>
