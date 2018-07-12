<template lang="pug">
  div(:class="`main-content page-${page}`")
    header.main-header
      slot(name="header")
    hiswe-contact
    hiswe-social
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
.main-header {
  background: white;
  grid-area: header;
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

