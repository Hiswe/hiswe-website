<script>
export default {
  name: `error-layout`,
}
</script>

<template lang="pug">
  main.error-layout(role="main")
    nuxt
</template>

<style lang="scss" scoped>
.error-layout {
  min-height: 100vh;

  // @media #{$mq-big} {
  //   display: grid;
  //   grid-template-columns: 2fr 1fr 3fr;
  //   grid-template-rows: 70px auto;
  //   grid-template-areas:
  //     '.            .            main-nav'
  //     'main-content main-content main-content';
  // }
}
</style>
