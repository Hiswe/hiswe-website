<script>
import HisweMainContent from '~/components/main-content.vue'
import HisweTwoLineTitle from '~/components/ui/two-line-title'
import HisweBlogHeader from '~/components/blog/header.vue'
import HisweBlogPosts from '~/components/blog/post-listing.vue'

export default {
  name: `page-blog`,
  transition: `page`,
  head: {
    title: `blog`,
  },
  components: {
    HisweMainContent,
    HisweBlogHeader,
    HisweTwoLineTitle,
    HisweBlogPosts,
  },
}
</script>

<template>
  <HisweMainContent page="blog">
    <template #header>
      <HisweBlogHeader />
    </template>
    <HisweTwoLineTitle
      class="blog-latest-title"
      text="latest blog posts"
      :level="2"
    />
    <client-only>
      <HisweBlogPosts />
    </client-only>
  </HisweMainContent>
</template>

<style lang="scss" scoped>
.page-blog {
  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-template-areas:
      'header header latest-title'
      'posts posts posts'
      'contact contact contact'
      'social social social';
  }
  @media #{$mq-big} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto auto minmax(0, 1fr);
    grid-template-areas:
      'header       header       contact contact contact social'
      'latest-title latest-title contact contact contact social'
      'posts        posts        posts   posts   posts   posts';
  }
}
.blog-latest-title {
  padding: 3rem 2rem 1rem;
  text-align: center;
  color: var(--c-primary-darker);
  grid-area: latest-title;
  background: var(--c-primary-lightest);

  @media #{$mq-medium} {
    font-size: calc(1.5vw + 0.5rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 0 2rem;
  }
  @media #{$mq-big} {
    padding-top: 3rem;
    padding-left: 1rem;
    font-size: 1.5rem;
    text-align: left;
  }
}
</style>
