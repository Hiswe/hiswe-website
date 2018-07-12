<template lang="pug">
hiswe-main-content(page="home")
  hiswe-home-header
  hiswe-contact
  hiswe-social
  hiswe-service(title="dev-elopment")
    template(slot="description")
      | building<br>web application
    ul
      li Reactive applications
      li Data persistence
      li Fast rendering with universal application
  hiswe-service(title="inte-gration")
    template(slot="description")
      | from webdesign<br>to webpage
    ul
      li Optimized for fast loading &amp; rendering
      li Bring your design to life with animations
      li Clean javascript code
  hiswe-service(title="web-design")
    template(slot="description")
      | make<br>efficiant UX
    ul
      li Fast delivery
      li Simple &amp; nice experience for users
      li Design for every screen size with responsive design
  hiswe-techs
</template>

<style lang="scss" scoped>
.page-home {
  display: flex;
  flex-direction: column;

  .contact {
    order: 2;
  }
  .social {
    order: 3;
  }

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
        var(--c-primary-darker) percentage(5/6),
        var(--c-primary-darkest-highlight) percentage(5/6)
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

<script>
import HisweHeader from '~/nuxt-components/home/header.vue'
import HisweService from '~/nuxt-components/home/service.vue'
import TechSection from '~/nuxt-components/home/techs.vue'

export default {
  name: `page-home`,
  transition: `page`,
  components: {
    'hiswe-home-header': HisweHeader,
    'hiswe-service': HisweService,
    'hiswe-techs': TechSection,
  },
}
</script>
