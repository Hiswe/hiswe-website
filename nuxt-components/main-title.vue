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
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media #{$mq-big} {
    justify-content: flex-start;
    padding-left: var(--gutter);
  }
}
a {
  color: var(--c-accent);
  transition: color 0.25s;

  &:hover {
    color: var(--c-primary-darker);
  }
}
</style>

<script>
export default {
  name: `main-title`,
}
</script>
