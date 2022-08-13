<script setup>
import { computed } from 'vue'

const props = defineProps({

  postId: {
    type: [Number, String],
    required: true
  },

  title: {
    type: String,
    required: false
  },

  light: {
    type: Boolean,
    default: false
  }

})

const src = computed(() => {
  return 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=' + props.postId + '&theme=' + (props.light ? 'light' : 'dark')
})
</script>

<template>
  <img
    :src="src"
    :alt="title"
    style="width: 250px; height: 54px;"
    width="250px"
    height="54px"
    class="c-product-hunt-badge"
  >
</template>
