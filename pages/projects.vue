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

  hiswe-webapp-listing

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
import HisweWebappListing from '~/nuxt-components/projects/webapp-listing.vue'

export default {
  name: `page-projects`,
  components: {
    'hiswe-project-header': HisweProjectHeader,
    'hiswe-npm-module': HisweNpmModule,
    'hiswe-webapp-listing': HisweWebappListing,
  },
}
</script>

