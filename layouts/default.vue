<script setup lang="ts">
</script>

<template>
  <main role="main">
    <MainNavigation />
    <slot />
    <NotificationsList />
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
</style>
