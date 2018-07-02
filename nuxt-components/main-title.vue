<template lang="pug">
  h1.main-title: nuxt-link(to="/" class="home-link"): hiswe-icon(name="hiswe")
</template>

<style lang="scss" scoped>
.main-title {
  background: white;
  margin: 0;
  text-align: center;
  font-size: 1em;
  padding: var(--gutter) 0;

  @media #{$mq-medium} {
    height: grid-size(2);
    width: grid-size(18);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
a {
  color: var(--c-accent);
}
</style>

<script>
export default {
  name: `main-title`,
}
</script>
