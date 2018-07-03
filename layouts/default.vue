<template lang="pug">
  main(role="main")
    hiswe-main-title
    hiswe-main-navigation
    nuxt
</template>

<style lang="scss" scoped>
main {
  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: 9fr 2fr;
    grid-auto-rows: auto;
    grid-template-areas:
      'main-title main-nav'
      'main-content main-nav';
  }
  @media #{$mq-big} {
    grid-template-columns: 2fr 1fr 3fr;
    grid-template-areas:
      'main-title empty main-nav'
      'main-content main-content main-content';
  }
}
.main-title {
  grid-area: main-title;
}
.main-navigation {
  grid-area: main-nav;
}
.main-content {
  grid-area: main-content;
}
</style>

<script>
import MainTitle from '~/nuxt-components/main-title.vue'
import MainNavigation from '~/nuxt-components/main-navigation.vue'

export default {
  name: `default-layout`,
  components: {
    'hiswe-main-title': MainTitle,
    'hiswe-main-navigation': MainNavigation,
  },
}
</script>

