<script>
import TwoLineTitle from '~/components/ui/two-line-title.vue'
import HisweTechLogo from '~/components/svg-tech-logos'

export default {
  name: `section-tech`,
  components: { HisweTechLogo, TwoLineTitle },
}
</script>

<template>
  <section class="techs">
    <div class="tech tech--server">
      <TwoLineTitle class="tech__title tech__title--server" text="ser-ver" />
      <a class="tech__item tech__item--node" href="https://nodejs.org/en/">
        <figure>
          <HisweTechLogo name="node" />
        </figure>
        <span>node</span>
      </a>
      <a class="tech__item tech__item--koa" href="https://koajs.com/">
        <figure>
          <HisweTechLogo name="koa" />
        </figure>
        <span>Koa</span>
      </a>
      <a class="tech__item tech__item--express" href="https://expressjs.com/">
        <figure>
          <HisweTechLogo name="express" />
        </figure>
        <span>Express</span>
      </a>
      <a class="tech__item tech__item--postgre" href="https://www.postgresql.org/">
        <figure>
          <HisweTechLogo name="postgre" />
        </figure>
        <span>PostgreSQL</span>
      </a>
      <a class="tech__item tech__item--mongo" href="https://www.mongodb.com/">
        <figure>
          <HisweTechLogo name="mongo" />
        </figure>
        <span>MongoDB</span>
      </a>
    </div>
    <div class="tech tech--framework">
      <TwoLineTitle class="tech__title tech__title--framework" text="frame-work" />
      <a class="tech__item tech__item--react" href="https://reactjs.org/">
        <figure>
          <HisweTechLogo name="react" />
        </figure>
        <span>React</span>
      </a>
      <a class="tech__item tech__item--vue" href="https://vuejs.org/">
        <figure>
          <HisweTechLogo name="vue" />
        </figure>
        <span>Vue.js</span>
      </a>
    </div>
    <div class="tech tech--build">
      <TwoLineTitle class="tech__title tech__title--build" text="bu-ild" />
      <a class="tech__item tech__item--webpack" href="https://webpack.js.org">
        <figure>
          <HisweTechLogo name="webpack" />
        </figure>
        <span>Webpack</span>
      </a>
      <a class="tech__item tech__item--parcel" href="https://parceljs.org">
        <figure>
          <HisweTechLogo name="parcel" />
        </figure>
        <span>Parcel</span>
      </a>
      <a class="tech__item tech__item--gulp" href="https://gulpjs.com">
        <figure>
          <HisweTechLogo name="gulp" />
        </figure>
        <span>Gulp</span>
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.techs {
  background: var(--c-primary-darker);
  padding-bottom: calc(var(--grid-size) * 2);

  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr 1fr 9fr 1fr;
    padding: var(--vertical-space) 0 0;
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
      [first-line-start] repeat(3, var(--grid-size)) [first-line-end second-line-start] repeat(3, var(--grid-size)) [second-line-end] var(--grid-size);
  }
}

.tech--framework {
  grid-area: framework;

  @media #{$mq-medium} {
    grid-template-columns: repeat(5, 1fr);
  }
}

.tech--server {
  grid-area: server;

  @media #{$mq-medium} {
    grid-template-columns: repeat(9, 1fr);
  }
}

.tech--build {
  grid-area: build;

  @media #{$mq-medium} {
    grid-template-columns: repeat(6, 1fr);
  }
}

.tech__title {
  padding: 0;

  @media #{$mq-medium} {
    grid-area: first-line-start / 1 / first-line-end / 6;
    text-align: left;
  }
}

.tech__title--server,
.tech__title--build {
  grid-area: 1 / 2 / 6 / 9;
}

.tech__title--framework {
  text-align: right;
  grid-area: 1 / 1 / 6 / 16;
}

// FRAMEWORK
.tech__item--vue {
  grid-area: 4 / 3 / 8 / 6;

  @media #{$mq-medium} {
    grid-area: second-line-start / 1 / second-line-end / 3;
  }
}

.tech__item--react {
  grid-area: 4 / 7 / 8 / 10;

  @media #{$mq-medium} {
    grid-area: second-line-start / 4 / second-line-end / 6;
  }
}

// SERVER
.tech__item--node {
  grid-area: 2 / 9 / 6 / 12;

  @media #{$mq-medium} {
    grid-area: first-line-start / 5 / first-line-end / 7;
  }
}

.tech__item--koa {
  grid-area: 2 / 13 / 6 / 16;

  @media #{$mq-medium} {
    grid-area: first-line-start / 8 / first-line-end / 10;
  }
}

.tech__item--express {
  grid-area: 6 / 3 / 10 / 8;

  @media #{$mq-medium} {
    grid-area: second-line-start / 1 / second-line-end / 4;
  }
}

.tech__item--postgre {
  grid-area: 6 / 9 / 10 / 12;

  @media #{$mq-medium} {
    grid-area: second-line-start / 5 / second-line-end / 7;
  }
}

.tech__item--mongo {
  grid-area: 6 / 13 / 10 / 16;

  @media #{$mq-medium} {
    grid-area: second-line-start / 8 / second-line-end / 10;
  }
}

// BUILD
.tech__item--webpack {
  grid-area: 1 / 8 / 4 / 12;

  @media #{$mq-medium} {
    grid-area: first-line-start / 4 / first-line-end / 7;
  }
}

.tech__item--parcel {
  grid-area: 5 / 8 / 9 / 12;

  @media #{$mq-medium} {
    grid-area: second-line-start / 4 / second-line-end / 7;
  }
}

.tech__item--gulp {
  grid-area: 5 / 13 / 9 / 16;

  @media #{$mq-medium} {
    grid-area: second-line-start / 1 / second-line-end / 3;
  }
}</style>
