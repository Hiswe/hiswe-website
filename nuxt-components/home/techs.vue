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
    hiswe-title(text="bu-ild" class="tech__title tech__title--build")
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
  padding-bottom: calc(var(--grid-size) * 2);

  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr 1fr 9fr 1fr;
    padding: var(--grid-size) 0 0;
    grid-auto-rows: auto;
    grid-template-areas:
      '. framework .     . server .'
      '. build     build . .      .';
  }
  @media #{$mq-big} {
    grid-template-columns: 1fr 5fr 3fr 9fr 3fr 6fr 4fr;
    grid-template-areas: '. framework . server . build .';
  }
  figure {
    display: block;
    margin: 0;
    background: var(--c-primary-lighter);
    height: calc(var(--grid-size) * 3);

    @media #{$mq-medium} {
      height: calc(var(--grid-size) * 2);
    }
  }
  svg {
    display: block;
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
  }
  a {
    text-decoration: none;
    text-align: center;
    color: var(--c-primary-lightest);
    display: block;
    margin: 0;
    &:hover {
      color: var(--c-accent-lighter);
    }
  }
  span {
    display: block;
    padding: 0;
    font-size: 0.65rem;
    height: var(--grid-size);
    display: block;
    align-items: center;
    justify-content: center;
  }
}
.tech {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-auto-rows: var(--grid-size);

  @media #{$mq-small} {
    padding-top: calc(var(--grid-size) * 2);
  }

  @media #{$mq-medium} {
    grid-template-rows:
      [first-line-start] repeat(3, var(--grid-size))
      [first-line-end second-line-start] repeat(3, var(--grid-size))
      [second-line-end] var(--grid-size);
  }
  &--framework {
    grid-area: framework;
    @media #{$mq-medium} {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  &--server {
    grid-area: server;
    @media #{$mq-medium} {
      grid-template-columns: repeat(9, 1fr);
    }
  }
  &--build {
    grid-area: build;
    @media #{$mq-medium} {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  &__title {
    padding: 0;

    &--server,
    &--build {
      grid-area: 1 / 2 / 6 / 9;
    }
    &--framework {
      text-align: right;
      grid-area: 1 / 1 / 6 / 16;
    }

    @media #{$mq-medium} {
      grid-area: first-line-start / 1 / first-line-end / 6;
      text-align: left;
    }
  }
  &__item {
    // FRAMEWORK
    &--vue {
      grid-area: 4 / 3 / 8 / 6;
      @media #{$mq-medium} {
        grid-area: second-line-start / 1 / second-line-end / 3;
      }
    }
    &--react {
      grid-area: 4 / 7 / 8 / 10;
      @media #{$mq-medium} {
        grid-area: second-line-start / 4 / second-line-end / 6;
      }
    }
    // SERVER
    &--node {
      grid-area: 2 / 9 / 6 / 12;
      @media #{$mq-medium} {
        grid-area: first-line-start / 5 / first-line-end / 7;
      }
    }
    &--koa {
      grid-area: 2 / 13 / 6 / 16;
      @media #{$mq-medium} {
        grid-area: first-line-start / 8 / first-line-end / 10;
      }
    }
    &--express {
      grid-area: 6 / 3 / 10 / 8;
      @media #{$mq-medium} {
        grid-area: second-line-start / 1 / second-line-end / 4;
      }
    }
    &--postgre {
      grid-area: 6 / 9 / 10 / 12;
      @media #{$mq-medium} {
        grid-area: second-line-start / 5 / second-line-end / 7;
      }
    }
    &--mongo {
      grid-area: 6 / 13 / 10 / 16;
      @media #{$mq-medium} {
        grid-area: second-line-start / 8 / second-line-end / 10;
      }
    }
    // BUILD
    &--webpack {
      grid-area: 1 / 8 / 4 / 12;
      @media #{$mq-medium} {
        grid-area: first-line-start / 4 / first-line-end / 7;
      }
    }
    &--parcel {
      grid-area: 5 / 8 / 9 / 12;
      @media #{$mq-medium} {
        grid-area: second-line-start / 4 / second-line-end / 7;
      }
    }
    &--gulp {
      grid-area: 5 / 13 / 9 / 16;
      @media #{$mq-medium} {
        grid-area: second-line-start / 1 / second-line-end / 3;
      }
    }
  }
}
</style>

<script>
export default {
  name: `section-tech`,
}
</script>

