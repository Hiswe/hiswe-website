<script>
import HisweMainContent from '~/components/main-content.vue'
import HisweHomeHeader from '~/components/home/header.vue'
import HisweHomeService from '~/components/home/service.vue'
import HisweHomeTechs from '~/components/home/techs.vue'

export default {
  name: `page-home`,
  transition: `page`,
  head: {
    title: `home`,
  },
  components: {
    HisweMainContent,
    HisweHomeHeader,
    HisweHomeService,
    HisweHomeTechs,
  },
}
</script>

<template>
  <HisweMainContent page="home">
    <template #header>
      <HisweHomeHeader />
    </template>
    <HisweHomeService title="dev-elopment">
      <template #description> building<br />web application </template>
      <ul>
        <li>Reactive applications</li>
        <li>Data persistence</li>
        <li>Fast rendering with universal application</li>
      </ul>
    </HisweHomeService>
    <HisweHomeService title="inte-gration">
      <template #description> from webdesign<br />to webpage </template>
      <ul>
        <li>Optimized for fast loading &amp; rendering</li>
        <li>Bring your design to life with animations</li>
        <li>Clean javascript code</li>
      </ul>
    </HisweHomeService>
    <HisweHomeService title="web-design">
      <template #description> make<br />efficiant UX </template>
      <ul>
        <li>Fast delivery</li>
        <li>Simple &amp; nice experience for users</li>
        <li>Design for every screen size with responsive design</li>
      </ul>
    </HisweHomeService>
    <HisweHomeTechs />
  </HisweMainContent>
</template>

<style lang="scss" scoped>
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
    .service--development {
      grid-area: development;
    }
    .service--integration {
      grid-area: integration;
    }
    .service--webdesign {
      grid-area: webdesign;
    }
    .techs {
      grid-area: techs;
    }
  }
  @media #{$mq-big} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, auto) minmax(0vh, 0.5fr);

    &::after {
      content: '';
      background: var(--c-primary-darker);
      background: linear-gradient(
        to right,
        var(--c-primary-darker) percentage(math.div(5, 6)),
        var(--c-primary-darkest-highlight) percentage(math.div(5, 6))
      );
      grid-area: footer;
    }
    grid-template-areas:
      'header      header      integration  webdesign webdesign webdesign'
      'header      header      integration  contact   contact   contact'
      'development development integration  contact   contact   contact'
      'techs      techs        techs        techs     techs     social'
      'footer      footer        footer        footer     footer     footer';
  }
}
</style>
