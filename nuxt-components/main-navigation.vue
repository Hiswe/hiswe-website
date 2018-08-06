<template lang="pug">
nav.main-navigation
  nuxt-link(to="/" exact-active-class="active" data-name="home") home
  nuxt-link(to="/projects" active-class="active" data-name="projects") projects
  // nuxt-link(to="/work" active-class="active" data-name="work") work
  nuxt-link(to="/blog" active-class="active" data-name="blog") blog
</template>

<style lang="scss" scoped>
.main-navigation {
  --navigation-font-size: 0.85rem;
  --navigation-top-spacing: var(--gutter);
  font-weight: 800;
  background: var(--c-primary-lightest);
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media #{$mq-big} {
    height: auto;
    background: var(--c-primary-lightest);
  }
}
a {
  color: var(--c-accent);
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  height: var(--nav-height);
  text-align: center;
  position: relative;
  flex-grow: 1;

  &:not(.active):hover::after {
    clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%);
  }
  &.active::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--c-accent);
    height: 0.5rem;
  }

  @media #{$mq-big} {
    --navigation-font-size: 1rem;
    --navigation-top-spacing: 0.25rem;
    padding: var(--gutter);

    &.active::before {
      bottom: auto;
      top: 0;
      right: 0;
      width: auto;
      height: 10px;
    }
  }
  &::after {
    content: attr(data-name);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--c-background);
    background: var(--c-primary-darker);
    clip-path: polygon(0 100%, 0 100%, 100% 100%, 100% 100%);
    transition: clip-path 0.25s;
  }
}
</style>

<script>
export default {
  name: `main-navigation`,
}
</script>
