<template lang="pug">
nav.main-navigation
  input(type="checkbox" id="menu-toggle")
  label(for="menu-toggle"): hiswe-icon(name="menu")
  div
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
    position: static;
    display: flex;
    width: 100%;
  }
  @media #{$mq-big} {
    height: auto;
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

  @media #{$mq-small} {
    width: 50%;
    height: 50vh;
    float: left;
  }
  @media #{$mq-medium} {
    height: var(--nav-height);
    text-align: center;
    position: relative;
    flex-grow: 1;

    &:not(.active):hover::after {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

      @media #{$mq-medium} {
        clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%);
      }
    }
    &.active::before {
      content: '';
      width: 10px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background: var(--c-accent);
    }
  }
  @media #{$mq-medium} {
    &.active::before {
      bottom: 0;
      top: auto;
      right: 0;
      width: auto;
      height: 0.5rem;
    }
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
    background: var(--c-accent);
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    transition: clip-path 0.25s;

    @media #{$mq-medium} {
      background: var(--c-primary-darker);
      clip-path: polygon(0 100%, 0 100%, 100% 100%, 100% 100%);
    }
  }
}
</style>


<script>
export default {
  name: `main-navigation`,
}
</script>

