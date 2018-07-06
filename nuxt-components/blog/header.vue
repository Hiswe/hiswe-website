<template lang="pug">
header.blog-header
  hiswe-header.blog-header-text(tag="div")
    template(slot="left"): h3.header-title blog
    template(slot="right")
      | Documenting and passing knowledge to help as I've being helped
  a.full-post-link(href="https://hiswe.github.io/") see full blog
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
  text-decoration: none;
  font-size: 1.5rem;
  color: var(--c-accent);

  &:hover {
    text-decoration: underline;
  }
}
</style>

<script>
export default {
  name: `hiswe-blog-header`,
}
</script>
