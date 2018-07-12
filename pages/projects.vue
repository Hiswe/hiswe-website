<template lang="pug">
hiswe-main-content(page="projects")

  hiswe-contact
  hiswe-project-header

  hiswe-title(text="NPM modules" class="npm-title" level="2")
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

  hiswe-title(text="web applications" class="webapp-title" level="2")
  hiswe-webapp-listing

  hiswe-social

</template>

<style lang="scss" scoped>
.page-projects {
  background: white;

  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-template-areas:
      'header        header       npm-description'
      'npm-title     npm-title    npm-description'
      'npm-modules   npm-modules  npm-modules'
      'webapp-title  webapp-title webapp-title'
      'webapps       webapps      webapps'
      'contact       contact      contact'
      'social        social       social';
  }
  @media #{$mq-big} {
    grid-template-columns: repeat(4, 3fr) 3.5fr 2.5fr;
    grid-template-areas:
      'header      header      npm-description  contact       contact       contact'
      'npm-title   npm-title   npm-description  contact       contact       contact'
      'npm-modules npm-modules npm-modules      webapp-title  webapp-title  social'
      'webapps      webapps    webapps          webapps       webapps       social';
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
  align-self: end;

  @media #{$mq-medium} {
    padding: 3rem percentage(21/36) 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.npm-description {
  grid-area: npm-description;

  @media #{$mq-medium} {
    padding: 0 0 var(--vertical-space);
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
      padding: 1rem 0 0;
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
    grid-template-columns: 5fr repeat(2, 6.5fr);
    padding: 0;

    // fill blank NPM module
    &::before {
      content: '';
      background: var(--c-primary);
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
  @media #{$mq-medium-only} {
    padding-left: percentage(1/3);
  }
  @media #{$mq-big} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: percentage(1 / 13);
  }
}
.web-apps {
  grid-area: webapps;
}
.page-projects .social {
  @media #{$mq-big} {
    align-items: start;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>

<script>
import HisweProjectHeader from '~/nuxt-components/projects/header.vue'
import HisweNpmModule from '~/nuxt-components/projects/npm-module.vue'
import HisweWebappListing from '~/nuxt-components/projects/webapp-listing.vue'

export default {
  name: `page-projects`,
  transition: `page`,
  components: {
    'hiswe-project-header': HisweProjectHeader,
    'hiswe-npm-module': HisweNpmModule,
    'hiswe-webapp-listing': HisweWebappListing,
  },
}
</script>

