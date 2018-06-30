<template lang="pug">
.home
  .header
    h1 I make custom website for everyone's need
    .header__description
      h2 I'm Yannick “hiswe” Aïvayan
      p a full stack Javascript web-developer
      p depending on the project I will use the most appropriate set of tools.
  section.services
    hiswe-service(title="dev-elopment" :style={'--servive-background': `var(--c-primary)`})
      template(slot="description")
        p building web application
      ul
        li reactive applications
        li data persistence
        li fast rendering with universal application
    hiswe-service(title="inte-gration" :style={'--servive-background': `var(--c-primary-darker)`})
      template(slot="description")
        p from webdesign to webpage
      ul
        li optimized for fast loading &amp; rendering
        li bring your design to life with animations
        li clean javascript code
    hiswe-service(title="web-design"  :style={'--servive-background': `var(--c-accent)`})
      template(slot="description")
        p make efficiant UX
      ul
        li fast delivery
        li simple &amp; nice experience for users
        li design for every screen size with responsive design

  hiswe-contact
</template>

<style lang="scss" scoped>
.header {
  padding: 0 var(--gutter);
  text-align: center;

  @media #{$mq-big} {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;

    &__description {
      width: 50%;
      flex: 0 1 50%;
    }
  }
}
h1 {
  text-align: center;
  padding: 2rem var(--gutter);
  line-height: 1;

  @media #{$mq-big} {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    width: 50%;
    flex: 0 1 50%;
  }
}
h2 {
  color: var(--c-accent);
  line-height: 1;
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

export default {
  name: `page-home`,
  components: {
    'hiswe-service': HisweService,
  },
}
</script>
