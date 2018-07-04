<template lang="pug">
hiswe-main-content.page-projects

  hiswe-project-header

  hiswe-title(text="NPM modules" class="npm-title")
  .npm-description
    p
      | in <a href="https://nodejs.org/en/">Node.js'</a> community,
      | <a href="https://www.npmjs.com/">NPM's</a> modules are the essential building blocks.
    p Those are my contributions
  .npm-modules
    hiswe-npm-module(name="gulp-svg-symbols")
      | Help create an icon library by bundling SVG files together
    hiswe-npm-module(name="vh-check")
      | Help handling some sizes on mobile browser

  hiswe-title(text="web applications" class="webapp-title")

  section.web-app
    article.web-app__item
      header.web-app__item_header
        h3 A-Count
        p: a(href="https://github.com/Hiswe/a-count"): img(src="@/nuxt-assets/logos/©a-count.svg" width="100")
        p: a(href="https://github.com/Hiswe/a-count") website
      p <a href="http://www.acuriousanimal.com/2016/08/10/universal-applications.html">Universal application</a> for simple account
      ul
        li help to manage small structures quotations/invoice
        li print directly from the browser
        li
          | powered by <a href="https://reactjs.org/">React</a>,
          | <a href="https://koajs.com/">Koa</a>
          | & <a href="https://www.postgresql.org/">PostgreSQL</a>

    article.web-app__item
      header.web-app__item_header
        h3 Thailpha
        p: a(href="https://github.com/Hiswe/thailpha"): img(src="@/nuxt-assets/logos/©thailpha.svg" width="100")
        p: a(href="https://github.com/Hiswe/thailpha") website
      p
        | <a href="https://en.wikipedia.org/wiki/Progressive_Web_Apps">Progressive Web Application</a>
        | of a Thai alphabet dictionary
      ul
        li keep a list of any Thai character at any time
        li can easily check similar-looking characters
        li can be installed on any phone home without having to go to the apple/play store
        li powered by <a href="https://reactjs.org/">React</a>

    article.web-app__item
      header.web-app__item_header
        h3 Thaime
        p: a(href="https://github.com/Hiswe/thaime"): img(src="@/nuxt-assets/logos/©thaime.svg" width="100")
        p: a(href="https://github.com/Hiswe/thaime") website
      p
        | <a href="https://en.wikipedia.org/wiki/Progressive_Web_Apps">Progressive Web Application</a>
        | of a Thai clock & time converter
      ul
        li
          | two ways conversion from
          a(href="https://en.wikipedia.org/wiki/24-hour_clock") 24 hour clock system
          | to
          a(href="https://en.wikipedia.org/wiki/Six-hour_clock") six hour clock system
        li days & months dictionary
        li
          | two ways conversion from
          a(href="https://en.wikipedia.org/wiki/Buddhist_calendar") Buddhist calendar
          | to
          a(href="https://en.wikipedia.org/wiki/Gregorian_calendar") Gregorian calendar
        li
          | powered by
          a(href="https://vuejs.org") Vue

  hiswe-contact
  hiswe-social

</template>

<style lang="scss" scoped>
.page-projects {
  // display: grid;
  // grid-template-columns: 2fr 12fr 2fr;
  // grid-template-areas: 'header header header'
}

.npm-title,
.npm-description,
.npm-modules {
  background: var(--c-primary);
}
.npm-title,
.npm-description {
  color: white;
  padding: var(--grid-size) grid-size(2) 0;
}
.npm-description p {
  margin: 0;
}
.npm-modules {
  background: var(--c-primary);
  padding: var(--grid-size) grid-size(2) 0;
}
.webapp-title {
  background: white;
  text-align: center;
  color: var(--c-primary-darkest);
  padding: grid-size(4) grid-size(1);
}
</style>

<script>
import HisweProjectHeader from '~/nuxt-components/projects/header.vue'
import HisweNpmModule from '~/nuxt-components/projects/npm-module.vue'

export default {
  name: `page-projects`,
  components: {
    'hiswe-project-header': HisweProjectHeader,
    'hiswe-npm-module': HisweNpmModule,
  },
}
</script>

