<script setup lang="ts">
defineOptions({
  name: `HomeTechs`,
})
</script>

<template>
  <section class="techs bg-primary-darker items-start p-8">
    <HomeTechsServer class="tech--server" />
    <div class="tech tech--framework">
      <UiTwoLineTitle class="tech__title tech__title--framework" text="frame-work" />
      <HomeTechsItem name="react" class="tech__item--react" href="https://reactjs.org/">
        <SvgoTechReact />
      </HomeTechsItem>
      <HomeTechsItem name="vue" class="tech__item--vue" href="https://vuejs.org/">
        <SvgoTechVue />
      </HomeTechsItem>
    </div>
    <HomeTechsBuild class="tech--build" />
  </section>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.techs {
  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr 1fr 9fr 1fr;
    grid-auto-rows: auto;
    grid-template-areas:
      '. framework .      . build  .'
      '. server    server . .      .';
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
}

.tech--build {
  grid-area: build;
}

.tech__title {
  padding: 0;

  @media #{$mq-medium} {
    grid-area: first-line-start / 1 / first-line-end / 6;
    text-align: left;
  }
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
</style>
