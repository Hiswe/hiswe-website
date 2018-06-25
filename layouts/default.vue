<template lang="pug">
  main(role="main")
    nav
      nuxt-link(to="/") about
      nuxt-link(to="/projects") projects
      nuxt-link(to="/work") work
      nuxt-link(to="/tech") tech
      a(href="https://hiswe.github.io/") blog
    nuxt
</template>

<style lang="scss">
@import '@/assets/css/css-vars.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  // base font size
  font-size: 112.5%;
  // Prevent font scaling in landscape while allowing user zoom
  -webkit-text-size-adjust: 100%;
}

html,
body {
  margin: 0;
  padding: 0;
  // http://markdotto.com/2018/02/07/github-system-fonts/
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>

<style lang="scss" scoped>
nav {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 800;
  padding: 0.5em;

  a {
    display: block;
    color: var(--c-accent);
    text-decoration: none;
    padding: 0.5em;
    text-transform: uppercase;
    text-align: right;
  }
}
</style>
