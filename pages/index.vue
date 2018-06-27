<template lang="pug">
.home

  h1 I make custom website for everyone's need

  header
    h2 I'm Yannick “hiswe” Aïvayan
    p a full stack Javascript web-developer
    p depending on the project I will use the most appropriate set of tools.

  aside
    a(href="https://github.com/hiswe"): hiswe-icon(name="github")
    a(href="https://medium.com/@hiswehalya"): hiswe-icon(name="medium")
    a(href="https://codepen.io/Hiswe"): hiswe-icon(name="codepen")

  hiswe-service(title="development" :style={'--servive-background': `var(--c-primary)`})
    h4 building web application
    ul
      li Reactive applications
      li Data persistence
      li Fast rendering with Universal Application

  hiswe-service(title="integration" :style={'--servive-background': `var(--c-primary-darker)`})
    h4 from webdesign to webpage
    ul
      li Optimized for fast loading &amp; rendering
      li Bring your design to life with animations
      li Clean JavaScript code

  hiswe-service(title="web-design"  :style={'--servive-background': `var(--c-accent)`})
    h4 I like it that way
    ul
      li Fast delivery
      li Efficient UX Design: what users wants it's a simple &amp; complete experience
      li Responsive design: web is now from mobile to desktop. I design for every platform

</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  padding: 2rem var(--gutter);
  line-height: 1;
}
header {
  padding: 0 var(--gutter);
  text-align: center;

  h2 {
    color: var(--c-accent);
    line-height: 1;
  }
}

aside {
  max-width: 200px;
  width: 100%;
  margin: var(--gutter) auto;
  display: flex;
  justify-content: space-between;

  a {
    color: var(--c-accent);

  }
}
// .services {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   max-width: 1080px;
//   margin: 0 auto;
// }
</style>

<script>
import HisweService from '~/nuxt-components/hiswe-service.vue'

export default {
  name: `page-home`,
  components: {
    'hiswe-service': HisweService,
  },
}
</script>
