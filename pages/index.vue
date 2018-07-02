<template lang="pug">
.home
  .header
    h2 I make custom website for everyone's need
    dl.presentation
      dt.presentation__title I'm<br> Yannick<br> “hiswe”<br> Aïvayan
      dd.presentation__description
        p a full stack Javascript web-developer
        p depending on the project I will use the most appropriate set of tools.
  section.services
    hiswe-service(title="dev-elopment")
      template(slot="description")
        | building<br>web application
      ul
        li reactive applications
        li data persistence
        li fast rendering with universal application
    hiswe-service(title="inte-gration")
      template(slot="description")
        | from webdesign<br>to webpage
      ul
        li optimized for fast loading &amp; rendering
        li bring your design to life with animations
        li clean javascript code
    hiswe-service(title="web-design")
      template(slot="description")
        | make<br>efficiant UX
      ul
        li fast delivery
        li simple &amp; nice experience for users
        li design for every screen size with responsive design

  hiswe-techs
  hiswe-contact
</template>

<style lang="scss" scoped>
.header {
  padding: 0 0 var(--two-gutter);
  text-align: center;
  background: white;

  @media #{$mq-big} {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
  }
}
h2 {
  text-align: center;
  padding: 2.5em 0;
  line-height: 1;
  font-size: 1.85rem;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;

  @media #{$mq-big} {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    width: 50%;
    flex: 0 1 50%;
  }
}
.presentation {
  display: flex;
  margin: 0;

  @supports (display: grid) {
    @include grid;
    grid-auto-rows: auto;
  }

  &__title,
  &__description {
    width: 50%;
    flex: 0 1 50%;
    margin: 0;
    @supports (display: grid) {
      width: auto;
    }
  }
  &__title {
    padding-right: var(--gutter);
    text-align: right;
    color: var(--c-accent);
    line-height: 1;
    font-size: 2rem;
    font-weight: 900;
    @supports (display: grid) {
      padding: 0;
      grid-area: 1 / 1 / 1 / 8;
    }
  }
  &__description {
    padding-left: var(--gutter);
    text-align: left;
    color: var(--c-primary-darker);
    font-size: 0.9rem;
    @supports (display: grid) {
      grid-area: 1 / 9 / 1 / 16;
      padding: 0;
    }

    p {
      margin: 0;

      + p {
        margin-top: var(--gutter);
      }
    }
  }
}
.services {
  @media #{$mq-big} {
    display: flex;
  }

  @supports (display: grid) and (display: contents) {
    // @supports #{$full-grid-support} {
    @media #{$mq-big} {
      // display: grid;
    }
  }
  dl {
    flex-basis: percentage(1/3);
  }
  //
}

// @supports $full-grid-support {

// }

// .services {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   max-width: 1080px;
//   margin: 0 auto;
// }
</style>

<script>
import HisweService from '~/nuxt-components/hiswe-service.vue'
import TechSection from '~/nuxt-components/techs.vue'

export default {
  name: `page-home`,
  components: {
    'hiswe-service': HisweService,
    'hiswe-techs': TechSection,
  },
}
</script>
