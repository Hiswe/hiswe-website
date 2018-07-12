<template lang="pug">
  main(role="main")
    hiswe-main-navigation
    nuxt
    hiswe-notifications
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;

  @media #{$mq-medium} {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    grid-template-areas:
      'main-title '
      'main-nav'
      'main-content';
  }
  @media #{$mq-big} {
    grid-template-columns: 2fr 1fr 3fr;
    grid-template-rows: 70px auto;
    grid-template-areas:
      'main-title empty main-nav'
      'main-content main-content main-content';
  }

  &::before {
    content: '';
    background: white;
    grid-area: main-title;
  }
}
.main-navigation {
  grid-area: main-nav;
}
.main-content {
  grid-area: main-content;
}
</style>

<script>
import MainNavigation from '~/nuxt-components/main-navigation.vue'
import Notifications from '~/nuxt-components/notifications.vue'

export default {
  name: `default-layout`,
  components: {
    'hiswe-main-navigation': MainNavigation,
    'hiswe-notifications': Notifications,
  },
}
</script>

