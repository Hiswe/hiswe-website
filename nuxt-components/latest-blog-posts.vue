<template lang="pug" v-if="loadingDone">
  section
    h2 latest blog posts
    .posts
      article(v-for="post in posts" :key="post.published")
        a.post-link(:href="post.link")
          header
            .cover(:style="{'background-image': `url(${post.cover})`}")
            h3.title {{post.title}}
            time(:datetime="post.published") {{post.published | localDate}}
          .summary(v-html="post.summary")
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
.posts {
  @media #{$mq-big} {
    display: flex;
    flex-wrap: wrap;
    padding-left: var(--half-gutter);
    padding-right: var(--half-gutter);
  }
}
article {
  margin-top: var(--gutter);
  margin-left: var(--half-gutter);
  margin-right: var(--half-gutter);

  @media #{$mq-big} {
    --post-width: calc(#{percentage(1 / 4)} - var(--gutter));
    width: var(--post-width);
    flex: 0 1 var(--post-width);
  }
}
.post-link {
  color: white;
  display: block;
  text-decoration: none;
  height: 100%;

  background: rgba(255, 255, 255, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transition: 0.5s box-shadow;
    pointer-events: none;
    z-index: 2;
  }

  &:hover::before {
    box-shadow: inset 0 0 0 10px var(--c-accent);
  }
}
header {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--c-primary-black);
}
.cover {
  min-height: 130px;
  margin: 0 auto;
  background-position: center center;
  background-repeat: none;
  background-size: 240px;
  opacity: 0.35;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: background-size 0.5s;

  .post-link:hover & {
    background-size: 400px;
  }
}
.title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.1;
  text-transform: uppercase;
  margin: 0;
  padding: var(--half-gutter) var(--half-gutter) 0;
  position: relative;

  @media #{$mq-big} {
    font-size: 1.25rem;
  }
}
time {
  display: block;
  text-align: center;
  color: var(--c-primary);
  margin: 0;
  position: relative;
}
.summary {
  margin: var(--half-gutter) 0 0;
  padding: var(--half-gutter);

  @media #{$mq-big} {
    text-align: center;
  }
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

