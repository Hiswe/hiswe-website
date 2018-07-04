<template lang="pug">
  hiswe-main-content
    h3 blog
    h4: a(href="https://hiswe.github.io/") see full blog
    no-ssr: hiswe-blog-posts
</template>

<script>
import LatestBlogPosts from '~/nuxt-components/latest-blog-posts.vue'
export default {
  name: `page-blog`,
  components: {
    'hiswe-blog-posts': LatestBlogPosts,
  },
}
</script>
