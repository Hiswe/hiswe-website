<script setup lang="ts">
defineProps<{
  page: string
}>()

defineSlots<{
  default(): any
  header(): any
}>()
</script>

<template>
  <div class="main-content" :class="`page-${page}`">
    <header class="main-header">
      <slot name="header" />
    </header>
    <!-- <Contact /> -->
    <Social />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.main-content {
  grid-area: main-content;

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
