<script>
import HisweMainNavigation from '~/components/main-navigation.vue'
import HisweNotifications from '~/components/notifications/list'

export default {
  name: `default-layout`,
  components: {
    HisweMainNavigation,
    HisweNotifications,
  },
}
</script>

<template>
  <main role="main">
    <HisweMainNavigation />
    <nuxt />
    <HisweNotifications />
  </main>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

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
