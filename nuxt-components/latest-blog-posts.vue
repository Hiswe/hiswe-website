<template lang="pug" v-if="loadingDone">
  section
    h2 latest blog posts
    article(v-for="post in posts" :key="post.published")
      a.post-link(:href="post.link")
        div.cover(:style="{'background-image': `url(${post.cover})`}")
        h3.title {{post.title}}
        time(:datetime="post.published") {{post.published | localDate}}
        div.summary(v-html="post.summary")
</template>

<style lang="scss" scoped>
  section {
    background: var(--c-primary-darkest);
    padding: var(--gutter);
  }
  h2 {
    text-align: center;
    color: var(--c-primary-lighter);
    font-size: 2rem;
    margin: 0;
  }
  article {
    background: rgba(255,255,255, .1);
    margin-top: var(--gutter);

  }
  .post-link {
    color: white;
    display: block;
    padding: var(--gutter);
    text-decoration: none;
  }
  .cover {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    margin: 0 auto;
    background-color: var(--c-primary-darkest);
    background-position: center center;
    background-repeat: none;
    background-size: 240px;
  }
  .title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.1;
    text-transform: uppercase;
    margin: var(--gutter) 0 0;
  }
  time {
    display: block;
    text-align: center;
    color: var(--c-primary);
    margin: var(--half-gutter) 0 0;
  }
  .summary {
    margin: var(--half-gutter) 0 0;
  }

</style>

<script>
export default {
  name: `hiswe-latest-blog-post`,
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

