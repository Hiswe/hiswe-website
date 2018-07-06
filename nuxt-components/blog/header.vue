<template lang="pug">
header.blog-header
  hiswe-header(tag="div")
    template(slot="left"): h3 blog
    template(slot="right")
      | Documenting ad passing knowledge because it's what the web is
  a(href="https://hiswe.github.io/") see full blog
</template>

<style lang="scss" scoped>
.blog-header {
  background: white;
}
</style>

<script>
export default {
  name: `hiswe-blog-header`,
}
</script>
