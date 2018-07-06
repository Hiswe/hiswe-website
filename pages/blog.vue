<template lang="pug">
  hiswe-main-content(page="blog")
    h2 latest blog posts
    no-ssr: hiswe-blog-posts
    hiswe-contact
    hiswe-social
</template>

<script>
import Header from '~/nuxt-components/blog/header.vue'
import Posts from '~/nuxt-components/blog/post-listing.vue'

export default {
  name: `page-blog`,
  components: {
    'hiswe-blog-header': Header,
    'hiswe-blog-posts': Posts,
  },
}
</script>
