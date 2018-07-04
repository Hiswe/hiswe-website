<template lang="pug">
hiswe-main-content

  header
    hiswe-title(text="Open Source")
    p Projects that I've created and maintain to give back to the open source community.

  section.npm-module

    header.npm-module__header
      hiswe-title(text="NPM modules")
      p
        | in <a href="https://nodejs.org/en/">Node.js'</a> community,
        | <a href="https://www.npmjs.com/">NPM's</a> modules are the essential building blocks.
      p Those are my contributions

    article.npm-module__item
      h3 gulp-svg-symbols
      p: a(href="https://www.npmjs.com/package/gulp-svg-symbols") gulp-svg-symbols
      p Help create an icon library by bundling SVG files together

    article.npm-module__item
      h3 vh-check
      p: a(href="https://www.npmjs.com/package/vh-check") vh-check
      p Help handling some sizes on mobile browser

  section.web-app
    hiswe-title(text="web applications")

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

</template>

<style lang="scss" scoped>
.npm-module,
.web-app {
  max-width: 1024px;
  margin: 0 auto;

  header {
    text-align: center;
  }

  h2 {
    color: var(--c-primary-darker);
  }
}

.npm-module {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--gutter);

  &__header {
    grid-column: 1 / span 2;
  }
}

.web-app {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--gutter);

  h2 {
    grid-column: 1 / span 3;
  }
  h3 {
    text-align: center;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 1.25rem;
  }
  svg {
    display: block;
    margin: 0 auto;
  }
}
</style>
