<script setup lang="ts">
defineOptions({
  name: `HomeTechs`,
})
</script>

<template>
  <section class="techs bg-primary-darker items-start p-8">
    <HomeTechsFramework class="tech--framework" />
    <HomeTechsServer class="tech--server" />
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
}

.tech--server {
  grid-area: server;
}

.tech--build {
  grid-area: build;
}
</style>
