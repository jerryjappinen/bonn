<script setup>
import ExternalLink from './ExternalLink.vue'
import ProductHuntBadge from './ProductHuntBadge.vue'

const props = defineProps({
  postId,
  title,
  light,

  postSlug: {
    type: String,
    required: true
  }
})
</script>

<template>
  <ExternalLink
    :href="'https://www.producthunt.com/posts/' + postSlug"
    class="c-product-hunt-link"
  >
    <slot>
      <ProductHuntBadge
        :post-id="postId"
        :title="title"
        :light="light"
      />
    </slot>
  </ExternalLink>
</template>
