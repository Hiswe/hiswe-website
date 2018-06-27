<template lang="pug">
  main(role="main")
    header
      nuxt-link(to="/"): hiswe-icon(name="hiswe")

      nav
        nuxt-link(to="/projects") projects
        nuxt-link(to="/work") work
        nuxt-link(to="/skills") skills
        a(href="https://hiswe.github.io/") blog
    nuxt
</template>

<style lang="scss" scoped>
header {
  --svg-icon-scale: .5;
  display: flex;
  justify-content: space-between;
  padding: var(--half-gutter);
}
a {
  color: var(--c-accent);
}
nav {
  --navigation-font-size: 0.85rem;
  // position: absolute;
  top: 0;
  right: 0;
  font-weight: 800;
  padding: 0.5em;
  a {
    display: block;
    font-size: var(--navigation-font-size);
    text-decoration: none;
    text-transform: uppercase;
    text-align: right;

    + a {
      margin-top: var(--half-gutter);
    }
  }
}
</style>
