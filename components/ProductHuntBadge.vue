<script setup>
const props = defineProps({

  postId: {
    type: [Number, String],
    required: true
  },

  title: {
    type: String,
    default: undefined
  },

  light: {
    type: Boolean,
    default: false
  }

})
</script>

<template>
  <img
    :src="'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=' + postId + '&theme=' + (light ? 'light' : 'dark')"
    :alt="title"
    style="width: 250px; height: 54px;"
    width="250px"
    height="54px"
    class="c-product-hunt-badge"
  >
</template>
