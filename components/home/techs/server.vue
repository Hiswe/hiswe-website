<script setup lang="ts">
defineOptions({
  name: `HomeTechsServer`,
})
</script>

<template>
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
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

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
</style>
