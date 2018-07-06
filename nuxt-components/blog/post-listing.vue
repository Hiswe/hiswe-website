<template lang="pug" v-if="loadingDone">
  .posts
    hiswe-post-preview(v-for="post in posts" :key="post.published" :post="post")
</template>

<style lang="scss" scoped>
</style>

<script>
import PostPreview from './post'

export default {
  name: `hiswe-latest-blog-post`,
  components: {
    'hiswe-post-preview': PostPreview,
  },
  data() {
    return {
      loadingDone: false,
      posts: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http
        .get(`/api/latest-blog-post`)
        .then(response => {
          const { data } = response
          this.posts = data
          this.loadingDone = true
        })
        .catch(error => {
          // this.emptyText = `can't get category`
          console.log(error)
        })
    },
  },
}
</script>

