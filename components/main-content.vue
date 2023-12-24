<script>
import HisweContact from '~/components/contact.vue'
import HisweSocial from '~/components/social.vue'

export default {
  name: `hiswe-main-content`,
  components: { HisweContact, HisweSocial },
  props: {
    page: { type: String, required: true },
  },
}
</script>

<template>
  <div class="main-content" :class="`page-${page}`">
    <header class="main-header">
      <slot name="header" />
    </header>
    <HisweContact />
    <HisweSocial />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

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
  position: relative;

  &::before {
    background: white;
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: var(--nav-height);

    @media #{$mq-big} {
      content: '';
    }
  }
}
</style>
