<template lang="pug">
section.techs
  .tech.tech--server
    hiswe-title(text="ser-ver" class="tech__title tech__title--server")
    a.tech__item.tech__item--node(href="https://nodejs.org/en/")
      figure
        hiswe-tech-logo(name="node")
      span node
    a.tech__item.tech__item--koa(href="https://koajs.com/")
      figure
        hiswe-tech-logo(name="koa")
      span Koa
    a.tech__item.tech__item--express(href="https://expressjs.com/")
      figure
        hiswe-tech-logo(name="express")
      span Express
    a.tech__item.tech__item--postgre(href="https://www.postgresql.org/")
      figure
        hiswe-tech-logo(name="postgre")
      span PostgreSQL
    a.tech__item.tech__item--mongo(href="https://www.mongodb.com/")
      figure
        hiswe-tech-logo(name="mongo")
      span MongoDB

  .tech.tech--framework
    hiswe-title(text="frame-work" class="tech__title tech__title--framework")
    a.tech__item.tech__item--react(href="https://reactjs.org/")
      figure
        hiswe-tech-logo(name="react")
      span React
    a.tech__item.tech__item--vue(href="https://vuejs.org/")
      figure
        hiswe-tech-logo(name="vue")
      span Vue.js

  .tech.tech--build
    hiswe-title(text="bui-ild" class="tech__title tech__title--build")
    a.tech__item.tech__item--webpack(href="https://webpack.js.org")
      figure
        hiswe-tech-logo(name="webpack")
      span Webpack
    a.tech__item.tech__item--parcel(href="https://parceljs.org")
      figure
        hiswe-tech-logo(name="parcel")
      span Parcel
    a.tech__item.tech__item--gulp(href="https://gulpjs.com")
      figure
        hiswe-tech-logo(name="gulp")
      span Gulp

</template>

<style lang="scss" scoped>
.techs {
  background: var(--c-primary-darker);
  clear: both;

  @supports (display: grid) {
    padding-bottom: calc(var(--grid-size) * 2);
  }
  @media #{$mq-medium} {
    width: grid-size(18);
  }
  figure {
    display: block;
    margin: 0;
    background: var(--c-primary-lighter);

    @supports (display: grid) {
      height: calc(var(--grid-size) * 3);
    }
  }

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

    @supports (display: grid) {
      font-size: 0.65rem;
      height: var(--grid-size);
      display: block;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
}
.tech {
  max-width: 100%;

  &::before,
  &::after {
    content: '';
    display: table;
    clear: both;
  }
  @supports (display: grid) {
    @include grid;

    &::before,
    &::after {
      display: none;
    }
  }

  &__title {
    padding: var(--two-gutter) var(--gutter) var(--gutter);

    @supports (display: grid) {
      padding: 0;
    }

    &--server,
    &--build {
      grid-area: 1 / 2 / 6 / 9;
    }
    &--framework {
      text-align: right;
      grid-area: 1 / 1 / 6 / 16;
    }
  }

  &__item {
    &--node {
      grid-area: 2 / 9 / 6 / 12;
    }
    &--koa {
      grid-area: 2 / 13 / 6 / 16;
    }
    &--express {
      grid-area: 6 / 3 / 10 / 8;
    }
    &--postgre {
      grid-area: 6 / 9 / 10 / 12;
    }
    &--mongo {
      grid-area: 6 / 13 / 10 / 16;
    }
    &--vue {
      grid-area: 4 / 3 / 8 / 6;
    }
    &--react {
      grid-area: 4 / 7 / 8 / 10;
    }
    &--webpack {
      grid-area: 1 / 8 / 4 / 12;
    }
    &--parcel {
      grid-area: 5 / 8 / 9 / 12;
    }
    &--gulp {
      grid-area: 5 / 13 / 9 / 16;
    }
  }
}
.tech--server {
  padding-right: var(--gutter);
  a {
    float: right;
    margin-left: var(--gutter);
  }
}
.tech--framework,
.tech--build {
  padding-left: var(--gutter);
  a {
    float: left;
    margin-right: var(--gutter);
  }
}
.tech {
  @supports (display: grid) {
    padding: calc(var(--grid-size) * 3) 0 0;

    a {
      margin: 0;
    }
    svg {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
  }
}
</style>

<script>
export default {
  name: `section-tech`,
}
</script>

