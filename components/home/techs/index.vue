<script setup lang="ts">
defineOptions({
  name: `HomeTechs`,
})
</script>

<template>
  <section class="techs">
    <div class="tech tech--server">
      <UiTwoLineTitle class="tech__title tech__title--server" text="ser-ver" />
      <HomeTechsItem name="node" class="tech__item--node" href="https://nodejs.org/en/">
        <SvgoTechNode />
      </HomeTechsItem>
      <HomeTechsItem name="koa" class="tech__item--koa" href="https://koajs.com/">
        <SvgoTechKoa />
      </HomeTechsItem>
      <HomeTechsItem name="express" class="tech__item--express" href="https://expressjs.com/">
        <SvgoTechExpress />
      </HomeTechsItem>
      <HomeTechsItem name="postgre" class="tech__item--postgre" href="https://www.postgresql.org/">
        <SvgoTechPostgre />
      </HomeTechsItem>
      <HomeTechsItem name="mongo" class="tech__item--mongo" href="https://www.mongodb.com/">
        <SvgoTechMongo />
      </HomeTechsItem>
    </div>
    <div class="tech tech--framework">
      <UiTwoLineTitle class="tech__title tech__title--framework" text="frame-work" />
      <HomeTechsItem name="react" class="tech__item--react" href="https://reactjs.org/">
        <SvgoTechReact />
      </HomeTechsItem>
      <HomeTechsItem name="vue" class="tech__item--vue" href="https://vuejs.org/">
        <SvgoTechVue />
      </HomeTechsItem>
    </div>
    <div class="tech tech--build">
      <UiTwoLineTitle class="tech__title tech__title--build" text="bu-ild" />
      <HomeTechsItem name="webpack" class="tech__item--webpack" href="https://webpack.js.org">
        <SvgoTechWebpack />
      </HomeTechsItem>
      <HomeTechsItem name="parcel" class="tech__item--parcel" href="https://parceljs.org">
        <SvgoTechParcel />
      </HomeTechsItem>
      <HomeTechsItem name="gulp" class="tech__item--gulp" href="https://gulpjs.com">
        <SvgoTechGulp />
      </HomeTechsItem>
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
}
</style>
