<template lang="pug">
.main-content.home
  hiswe-home-header
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
  hiswe-contact
</template>

<style lang="scss" scoped>
.home {
  grid-area: main-content;

  @media #{$mq-medium} {
    --grid-size: #{(100 * (18/22) / 18) * 1vw};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-template-areas:
      'header header integration'
      'development development integration'
      'webdesign webdesign webdesign'
      'contact contact contact'
      'techs techs techs';

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
    .contact {
      grid-area: contact;
    }
    .techs {
      grid-area: techs;
    }
  }
}
</style>

<script>
import HisweHeader from '~/nuxt-components/home/header.vue'
import HisweService from '~/nuxt-components/home/service.vue'
import TechSection from '~/nuxt-components/home/techs.vue'

export default {
  name: `page-home`,
  components: {
    'hiswe-home-header': HisweHeader,
    'hiswe-service': HisweService,
    'hiswe-techs': TechSection,
  },
}
</script>
