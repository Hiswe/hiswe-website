<script>
import MainNavigation from '~/nuxt-components/main-navigation.vue'
import HisweNotifications from '~/nuxt-components/notifications/list'

export default {
  name: `default-layout`,
  components: {
    'hiswe-main-navigation': MainNavigation,
    HisweNotifications,
  },
}
</script>

<template lang="pug">
  main(role="main")
    hiswe-main-navigation
    nuxt
    hiswe-notifications
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;

  @media #{$mq-big} {
    display: grid;
    grid-template-columns: 2fr 1fr 3fr;
    grid-template-rows: 70px auto;
    grid-template-areas:
      '.            .            main-nav'
      'main-content main-content main-content';
  }
}
.main-navigation {
  grid-area: main-nav;
}
.main-content {
  grid-area: main-content;
}
</style>
