<template lang="pug">
  main(role="main")
    header
      nuxt-link(to="/" class="home-link"): hiswe-icon(name="hiswe")

      nav
        nuxt-link(to="/projects") projects
        nuxt-link(to="/work") work
        nuxt-link(to="/skills") skills
        a(href="https://hiswe.github.io/") blog
        nuxt-link(to="/contact") contact
    nuxt
</template>

<style lang="scss" scoped>
header {
  --svg-icon-scale: 0.75;
  display: flex;
  justify-content: space-between;
  padding: var(--gutter);
}
a {
  color: var(--c-accent);
}

nav {
  --navigation-font-size: 0.85rem;
  --navigation-top-spacing: var(--gutter);
  top: 0;
  right: 0;
  font-weight: 800;

  a {
    display: block;
    font-size: var(--navigation-font-size);
    text-decoration: none;
    text-transform: uppercase;
    text-align: right;

    @media #{$mq-big} {
      --navigation-font-size: 1rem;
      --navigation-top-spacing: 0.25rem;
    }

    + a {
      margin-top: var(--navigation-top-spacing);
    }
  }
}

@media #{$mq-big} {
  .home-link,
  nav {
    position: absolute;
    top: var(--gutter);
  }
  .home-link {
    left: var(--gutter);
  }
  nav {
    right: var(--gutter);
  }
}
</style>
