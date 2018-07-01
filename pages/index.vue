<template lang="pug">
.home
  .header
    h2 I make custom website for everyone's need
    dl.presentation
      dt.presentation__title I'm<br> Yannick<br> “hiswe”<br> Aïvayan
      dd.presentation__description
        p a full stack Javascript web-developer
        p depending on the project I will use the most appropriate set of tools.
  section.services
    hiswe-service(title="dev-elopment")
      template(slot="description")
        | building<br>web application
      ul
        li reactive applications
        li data persistence
        li fast rendering with universal application
    hiswe-service(title="inte-gration")
      template(slot="description")
        | from webdesign<br>to webpage
      ul
        li optimized for fast loading &amp; rendering
        li bring your design to life with animations
        li clean javascript code
    hiswe-service(title="web-design")
      template(slot="description")
        | make<br>efficiant UX
      ul
        li fast delivery
        li simple &amp; nice experience for users
        li design for every screen size with responsive design

  section.tools
    .tool.tool--server
      hiswe-title(text="ser-ver" class="tool__title tool__title--server")
      .tools__list.tools__list--server
        a(href="https://nodejs.org/en/")
          hiswe-tech-logo(name="node")
          span node
        a(href="https://koajs.com/")
          hiswe-tech-logo(name="koa")
          span Koa
        a(href="https://expressjs.com/")
          hiswe-tech-logo(name="express")
          span Express
        a(href="https://www.postgresql.org/")
          hiswe-tech-logo(name="postgre")
          span PostgreSQL
        a(href="https://www.mongodb.com/")
          hiswe-tech-logo(name="mongo")
          span MongoDB

    .tool.tool--framework
      hiswe-title(text="frame-work" class="tool__title tool__title--framework")
      .tools__list.tools__list--framework
        a(href="https://reactjs.org/")
          hiswe-tech-logo(name="react")
          span React
        a(href="https://vuejs.org/")
          hiswe-tech-logo(name="vue")
          span Vue.js

    .tool.tool--build
      hiswe-title(text="bui-ild" class="tool__title tool__title--build")
      .tools__list.tools__list--build
        a(href="https://webpack.js.org")
          hiswe-tech-logo(name="webpack")
          span Webpack
        a(href="https://parceljs.org")
          hiswe-tech-logo(name="parcel")
          span Parcel
        a(href="https://gulpjs.com")
          hiswe-tech-logo(name="gulp")
          span Gulp

  hiswe-contact
</template>

<style lang="scss" scoped>
.header {
  padding: 0 var(--gutter) var(--two-gutter);
  text-align: center;
  background: white;

  @media #{$mq-big} {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
  }
}
h2 {
  text-align: center;
  padding: 2.5em 0;
  line-height: 1;
  font-size: 1.85rem;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;

  @media #{$mq-big} {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    width: 50%;
    flex: 0 1 50%;
  }
}
.presentation {
  display: flex;
  margin: 0;

  &__title,
  &__description {
    width: 50%;
    flex: 0 1 50%;
    margin: 0;
  }
  &__title {
    padding-right: var(--gutter);
    text-align: right;
    color: var(--c-accent);
    line-height: 1;
    font-size: 2rem;
    font-weight: 900;
  }
  &__description {
    padding-left: var(--gutter);
    text-align: left;
    color: var(--c-primary-darker);
    font-size: 0.9rem;

    p {
      margin: 0;

      + p {
        margin-top: var(--gutter);
      }
    }
  }
}
.services {
  @media #{$mq-big} {
    display: flex;
  }

  @supports (display: grid) and (display: contents) {
    // @supports #{$full-grid-support} {
    @media #{$mq-big} {
      // display: grid;
    }
  }
  dl {
    flex-basis: percentage(1/3);
  }
  //
}

.tools {
  background: var(--c-primary-darker);

  svg {
    display: block;
  }
  a {
    text-decoration: none;
    text-align: center;
    color: var(--c-primary-lightest);
    display: block;
  }
  span {
    display: block;
    padding-bottom: 0.5em;
    font-size: 0.8rem;
  }
}
.tool {
  &::before,
  &::after {
    content: '';
    display: table;
    clear: both;
  }
  &__title {
    padding: var(--two-gutter) var(--gutter) var(--gutter);

    &--framework {
      text-align: right;
    }
  }
}
.tool--server {
  padding-right: var(--gutter);
  a {
    float: right;
    margin-left: var(--gutter);
  }
}
.tool--framework,
.tool--build {
  padding-left: var(--gutter);
  a {
    float: left;
    margin-right: var(--gutter);
  }
}

// @supports $full-grid-support {

// }

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
