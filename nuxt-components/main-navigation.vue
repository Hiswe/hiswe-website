<template lang="pug">
nav
  input(type="checkbox" id="menu-toggle")
  label(for="menu-toggle"): hiswe-icon(name="menu")
  div
    nuxt-link(to="/") home
    nuxt-link(to="/projects") projects
    nuxt-link(to="/work") work
    nuxt-link(to="/blog") blog
</template>

<style lang="scss" scoped>
nav {
  --navigation-font-size: 0.85rem;
  --navigation-top-spacing: var(--gutter);
  font-weight: 800;
  background: var(--c-primary-lightest);
}
label {
  --size: 40px;
  color: white;
  background: var(--c-accent);
  width: var(--size);
  height: var(--size);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
input {
  @include hidden-accessible;

  &:not(:checked) ~ div {
    @include hidden-accessible;
  }
}
svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
div {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;
  // display: flex;
  // display: none;
}
a {
  color: var(--c-accent);
  display: block;
  // font-size: var(--navigation-font-size);
  text-decoration: none;
  text-transform: uppercase;
  text-align: right;
  width: 50%;
  height: 50vh;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;

  @media #{$mq-big} {
    --navigation-font-size: 1rem;
    --navigation-top-spacing: 0.25rem;
  }

  + a {
    // margin-top: var(--navigation-top-spacing);
  }
}
</style>


<script>
export default {
  name: `main-navigation`,
}
</script>

