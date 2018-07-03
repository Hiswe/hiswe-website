<template lang="pug">
nav.main-navigation
  input(type="checkbox" id="menu-toggle")
  label(for="menu-toggle"): hiswe-icon(name="menu")
  div
    nuxt-link(to="/") home
    nuxt-link(to="/projects") projects
    nuxt-link(to="/work") work
    nuxt-link(to="/blog") blog
</template>

<style lang="scss" scoped>
.main-navigation {
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

  @media #{$mq-medium} {
    display: none;
  }
}
input {
  @include hidden-accessible;

  @media #{$mq-small} {
    &:not(:checked) ~ div {
      @include hidden-accessible;
    }
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

  @media #{$mq-medium} {
    left: auto;
    background: none;
    width: grid-size(4);
  }

  @media #{$mq-big} {
    position: static;
    display: flex;
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

  @media #{$mq-small} {
    width: 50%;
    height: 50vh;
    float: left;
  }

  @media #{$mq-medium} {
    height: grid-size(2);
    text-align: center;
    position: relative;

    &.nuxt-link-exact-active::before {
      content: '';
      width: 10px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background: var(--c-accent);
    }
  }
  @media #{$mq-big} {
    --navigation-font-size: 1rem;
    --navigation-top-spacing: 0.25rem;
    margin-right: var(--gutter);

    &.nuxt-link-exact-active::before {
      bottom: auto;
      right: 0;
      width: auto;
      height: 20px;
    }
  }
}
</style>


<script>
export default {
  name: `main-navigation`,
}
</script>

