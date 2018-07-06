<template lang="pug">
  hiswe-main-content(page="blog")

    header
      hiswe-header(tag="div")
        template(slot="left"): h3 blog
        template(slot="right")
          | Documenting ad passing knowledge because it's what the web is
      a(href="https://hiswe.github.io/") see full blog

    no-ssr: hiswe-blog-posts
    hiswe-contact
    hiswe-social
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
