<script setup lang="ts">
useHead({
  title: 'home',
})
</script>

<template>
  <MainContent page="home">
    <template #header>
      <HomeHeader />
    </template>
    <HomeService
      id="development"
      description="building<br>web application"
      class="bg-primary-lighter color-primary-darker"
    >
      <template #title>
        <UiTwoLineTitle text="dev-elopment" class="color-primary-darkest" />
      </template>
      <ul>
        <li>Reactive applications</li>
        <li>Data persistence</li>
        <li>Fast rendering with universal application</li>
      </ul>
    </HomeService>
    <HomeService
      id="integration"
      description="from webdesign<br>to webpage"
      class="bg-primary color-white"
    >
      <template #title>
        <UiTwoLineTitle text="inte-gration" />
      </template>
      <ul>
        <li>Optimized for fast loading &amp; rendering</li>
        <li>Bring your design to life with animations</li>
        <li>Clean javascript code</li>
      </ul>
    </HomeService>
    <HomeService
      id="webdesign"
      description="make<br>efficiant UX"
      class="bg-accent color-accent-lightest"
    >
      <template #title>
        <UiTwoLineTitle text="web-design" />
      </template>
      <ul>
        <li>Fast delivery</li>
        <li>Simple &amp; nice experience for users</li>
        <li>Design for every screen size with responsive design</li>
      </ul>
    </HomeService>
    <HomeTechs />
  </MainContent>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@import 'assets/css/scss-vars';

.page-home {
  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: repeate(5, auto) 1fr;
    grid-auto-rows: auto;
    grid-template-areas:
      'header      header      integration'
      'development development integration'
      'webdesign   webdesign   webdesign'
      'contact     contact     contact'
      'social      social      social'
      'techs       techs       techs';

    .header {
      width: auto;
      grid-area: header;
    }

    :deep(.service--development) {
      grid-area: development;
    }

    :deep(.service--integration) {
      grid-area: integration;
    }

    :deep(.service--webdesign) {
      grid-area: webdesign;
    }

    .techs {
      grid-area: techs;
    }
  }

  @media #{$mq-big} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, auto) minmax(0vh, 0.5fr);
    grid-template-areas: 'header      header      integration  webdesign webdesign webdesign'
      'header      header      integration  contact   contact   contact'
      'development development integration  contact   contact   contact'
      'techs       techs       techs        techs     techs     social'
      'footer      footer      footer       footer    footer    footer';

    &::after {
      content: '';
      background: var(--c-primary-darker);
      background: linear-gradient(to right,
          var(--c-primary-darker) percentage(math.div(5, 6)),
          var(--c-primary-darkest-highlight) percentage(math.div(5, 6)));
      grid-area: footer;
    }
  }
}
</style>
