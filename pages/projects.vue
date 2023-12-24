<script setup lang="ts">
useHead({
  title: 'projects',
})
</script>

<template>
  <MainContent page="projects">
    <template #header>
      <ProjectsHeader />
    </template>
    <UiTwoLineTitle class="npm-title" text="NPM modules" tag="h2" />
    <div class="npm-description">
      <p>
        in <a href="https://nodejs.org/en/">Node.js'</a> community,
        <a href="https://www.npmjs.com/">NPM's</a> modules are the essential
        building blocks.
      </p>
      <p>Those are my contributions</p>
    </div>
    <div class="npm-modules">
      <ProjectsNpmModule name="gulp-svg-symbols">
        Help create an icon library by bundling SVG files together
      </ProjectsNpmModule>
      <ProjectsNpmModule name="vh-check">
        Help handling some sizes on mobile browser
      </ProjectsNpmModule>
    </div>
    <UiTwoLineTitle class="webapp-title" text="web applications" tag="h2" />
    <ProjectsWebappListing />
  </MainContent>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@import 'assets/css/scss-vars';

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

    // make a solid blue background for better animations
    &::before {
      content: '';
      background: var(--c-primary);
      grid-area: 1 /1 /4 /4;
    }
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

  @media #{$mq-small} {
    text-align: center;
  }

  @media #{$mq-medium} {
    align-self: end;
    padding: 3rem percentage(math.div(21, 36)) 0 0;
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
    padding-left: percentage(math.div(1, 3));
  }

  @media #{$mq-big} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: percentage(math.div(1, 13));
  }
}

.web-apps {
  grid-area: webapps;
}

.page-projects :deep(.social) {
  @media #{$mq-big} {
    align-items: start;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
