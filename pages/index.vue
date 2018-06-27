<template lang="pug">
.home

  h1 I make custom website for everyone's need

  header
    h2 I'm Yannick “hiswe” Aïvayan
    p a full stack Javascript web-developer
    p depending on the project I will use the most appropriate set of tools.

  hiswe-service(title="development")
    h4 Sometimes you need more than a simple website, <br /> what you want is a real web application.
    ul
      li No more page reload with AJAX
      li Reactive applications
      li Data persistence

  hiswe-service(title="integration")
    h4 From webdesign to webpage:
    ul
      li Optimized for fast loading &amp; rendering
      li <a href="http://www.css3.info/graceful-degradation/">Graceful degradation</a> on old browser
      li Bring your design to life with animations
      li Better referencing &amp; accessibility with semantic &amp; valid HTML
      li Clean JavaScript code

  hiswe-service(title="web-design")
    h4 I like it that way:
    ul
      li Fast delivery
      li Efficient UX Design: what users wants it's a simple &amp; complete experience
      li Responsive design: web is now from mobile to desktop. I design for every platform

  ul
    li: a(href="https://github.com/hiswe"): hiswe-icon(name="github")
    li: a(href="https://medium.com/@hiswehalya"): hiswe-icon(name="medium")
    li: a(href="https://codepen.io/Hiswe"): hiswe-icon(name="codepen")

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
