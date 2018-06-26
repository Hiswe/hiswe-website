<template lang="pug">
.home
  h1 I make custom website for everyone's need

  h2 I'm Yannick “hiswe” Aïvayan
  p a full stack Javascript web-developer
  p depending on the project I will use the most appropriate set of tools.

  section.services

    hiswe-service(title="web-design")
      template(slot="left")
        h3 I like it that way:
        ul
          li Fast delivery
          li Efficient UX Design: what users wants it's a simple &amp; complete experience
          li Responsive design: web is now from mobile to desktop. I design for every platform
      template(slot="right")
        h3 I like to make:
        ul
          li Logos
          li Icons
          li
            span.hw-responsive-linebreak Typographies
            span.hw-responsive-linebreak: a(href="http://hiswe.github.io/hiso-font/") &nbsp;watch on Github
          li
            span.hw-responsive-linebreak Vector &amp; pixels illustrations
            span.hw-responsive-linebreak: a(href="http://hiswe.deviantart.com/") &nbsp;watch on Deviantart
          li
            span.hw-responsive-linebreak Sketches
            span.hw-responsive-linebreak: a(href="http://hiswe.tumblr.com/") &nbsp;watch on Tumblr

    hiswe-service(title="integration")
      template(slot="left")
        h3 From webdesign to webpage:
        ul
          li Optimized for fast loading &amp; rendering
          li <a href="http://www.css3.info/graceful-degradation/">Graceful degradation</a> on old browser
          li Bring your design to life with animations
          li Better referencing &amp; accessibility with semantic &amp; valid HTML
          li Clean JavaScript code
      template(slot="right")
        h3 I code in:
        ul
          li HTML 5
          li CSS 3
          li JavaScript &amp; jQuery

        h3 I use modern &amp; reliable tools:
        ul
          li <a href="http://jade-lang.com/">Jade templates</a>
          li <a href="http://learnboost.github.io/stylus/">Stylus</a> &amp; <a href="https://github.com/visionmedia/nib">Nib</a>
          li <a href="http://coffeescript.org/">CoffeeScript</a>
          li <a href="http://gulpjs.com/">Gulp</a>

    hiswe-service(title="development")
      template(slot="left")
        h3 Sometimes you need more than a simple website, <br /> what you want is a real web application.
        ul
          li No more page reload with AJAX
          li Reactive application with MVC design pattern
          li Secured data with CouchDB
      template(slot="right")
        h3 I develop complex applications with:
        p For the front-end
        ul
          li <a href="http://angularjs.org/">Google AngularJS</a>
        p For the back-end
        ul
          li <a href="http://nodejs.org/">NodeJS</a>
          li <a href="http://expressjs.com/">ExpressJS framework</a>
          li <a href="http://couchdb.apache.org/">CouchDB</a>

  ul
    li: a(href="https://github.com/hiswe"): img( src="~/assets/logos/©github.svg" width="100")
    li: a(href="https://medium.com/@hiswehalya"): img( src="~/assets/logos/©medium.svg" width="100")
    li: a(href="https://codepen.io/Hiswe"): img( src="~/assets/logos/©codepen.svg" width="100")

</template>

<style lang="scss" scoped>
.services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1080px;
  margin: 0 auto;
  // grid-template-rows: repeat(6, 1fr);
}
</style>

<script>
import HisweService from '~/components/hiswe-service.vue'

export default {
  name: `page-home`,
  components: {
    'hiswe-service': HisweService,
  },
}
</script>
