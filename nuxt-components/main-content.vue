<template lang="pug">
  div(:class="`main-content page-${page}`")
    slot
</template>

<style lang="scss" scoped>
.main-content {
  @media #{$mq-small} {
    display: flex;
    flex-direction: column;
  }

  .contact {
    order: 666;
  }
  .social {
    order: 667;
  }
}
</style>


<script>
export default {
  name: `hiswe-main-content`,
  props: {
    page: {
      type: String,
      required: true,
    },
  },
}
</script>

