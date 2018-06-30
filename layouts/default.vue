<template lang="pug">
  main(role="main")
    h1: nuxt-link(to="/" class="home-link"): hiswe-icon(name="hiswe")
    hiswe-main-navigation
    nuxt
</template>

<style lang="scss" scoped>
h1 {
  background: white;
  margin: 0;
  text-align: center;
  font-size: 1em;
  padding: var(--gutter) 0;
}
a {
  color: var(--c-accent);
}
</style>

<script>
import MainNavigation from '~/nuxt-components/main-navigation.vue'

export default {
  name: `default-layout`,
  components: {
    'hiswe-main-navigation': MainNavigation,
  },
}
</script>

