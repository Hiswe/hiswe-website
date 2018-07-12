<template lang="pug" v-if="loadingDone">
  // .posts
  transition-group(class="posts" name="list" tag="div")
    hiswe-post-preview(
      v-for="post in posts"
      :key="post.published"
      :post="post"
    )
</template>

<style lang="scss" scoped>
.posts {
  grid-area: posts;
  background: var(--c-primary-lightest);

  @media #{$mq-medium} {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }
  @media #{$mq-big} {
    grid-template-columns: repeat(4, 1fr);
  }
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;

  @for $i from 0 through 19 {
    &:nth-child(#{$i}) {
      transition-delay: $i * 0.075s;
    }
  }
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
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

