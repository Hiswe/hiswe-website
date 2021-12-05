<script>
import TwoColumnHeader from '~/components/ui/two-column-header.vue'

export default {
  name: `hiswe-blog-header`,
  components: { TwoColumnHeader },
}
</script>

<template>
  <div class="blog-header">
    <TwoColumnHeader class="blog-header-text">
      <template #left>
        <h1 class="header-title">blog</h1>
      </template>
      <template #right>
        Documenting and passing knowledge to help as I've being helped
      </template>
    </TwoColumnHeader>
    <a class="full-post-link" href="https://hiswe.github.io/">see full blog</a>
  </div>
</template>

<style lang="scss" scoped>
.blog-header {
  background: white;
  text-align: center;
  padding: 2rem 0;
  grid-area: header;

  .blog-header-text {
    padding: 0;
  }
}
.header-title {
  font-size: 2.25rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
}

.full-post-link {
  display: inline-block;
  padding-top: 1rem;
  text-decoration: underline;
  font-size: 1.5rem;
  color: var(--c-accent);

  &:hover {
    text-decoration: none;
  }
}
</style>
