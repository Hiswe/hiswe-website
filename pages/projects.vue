<template lang="pug">
hiswe-main-content(page="projects")

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
  background: white;

  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: 1fr 2fr 3fr 2fr 1fr;
    grid-auto-rows: auto;
    grid-template-areas:
      'header        header       header       npm-description npm-description'
      'npm-title     npm-title    npm-title    npm-description npm-description'
      'npm-modules   npm-modules  npm-modules  npm-modules     npm-modules'
      '.             webapp-title webapp-title webapp-title    webapp-title'
      'webapps       webapps      webapps      webapps         .'
      'contact       contact      contact      contact         contact'
      'social        social       social       social          social';
  }
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
.npm-title {
  grid-area: npm-title;

  @media #{$mq-medium} {
    padding: 3rem 50% 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.npm-description {
  grid-area: npm-description;

  @media #{$mq-medium} {
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr repeat(2, auto);
    grid-template-areas:
      '. .  .'
      '. first-paragraph  .'
      '. second-paragraph   .';
  }
  p {
    margin: 0;

    &:first-child {
      grid-area: first-paragraph;
    }
    &:last-child {
      padding: 1rem 0;
      grid-area: second-paragraph;
    }
  }
}
.npm-modules {
  grid-area: npm-modules;
  background: var(--c-primary);
  padding: var(--grid-size) grid-size(2) 0;

  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0;

    &::before {
      content: '';
      background: var(--c-primary);
      // display: block;
    }
  }
}
.webapp-title {
  grid-area: webapp-title;
  background: white;
  text-align: center;
  color: var(--c-primary-darkest);
  padding: grid-size(4) grid-size(1);

  @media #{$mq-medium} {
    padding: 4rem 0 2rem;
    text-align: left;
  }
}
.web-apps {
  grid-area: webapps;
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

