<script setup lang="ts">
defineProps<{
  name: string
  href: string
}>()

defineSlots<{
  default(): any
}>()
</script>

<template>
  <a class="tech__item" :href="href">
    <figure>
      <slot />
    </figure>
    <span>{{ name }}</span>
  </a>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

figure {
  display: block;
  margin: 0;
  background: var(--c-primary);
  height: calc(var(--grid-size) * 3);
  object-fit: contain;

  @media #{$mq-medium} {
    height: calc(var(--grid-size) * 2);
  }
}

a:hover figure {
  background: var(--c-accent-lighter);
}

figure :deep(svg) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  transition: background 0.25s, fill 0.25s;
}

figure :deep(path) {
  transition: fill 0.25s;
  fill: var(--c-primary-darker);
}

a:hover :deep(path) {
  fill: var(--c-accent);
}

figure :deep(path[style="fill:#999;"]) {
  fill: none !important;
}

figure :deep(path[style="fill:#ccc;fill-rule:nonzero;"]) {
  fill: var(--c-primary-lighter) !important;
}

a:hover :deep(path[style="fill:#ccc;fill-rule:nonzero;"]) {
  fill: var(--c-accent-lightest) !important;
}

a {
  text-decoration: none;
  text-align: center;
  color: var(--c-primary-lightest);
  display: block;
  margin: 0;

  &:hover {
    color: var(--c-accent-lighter);
  }
}

span {
  display: block;
  padding: 0;
  font-size: 0.65rem;
  height: var(--grid-size);
  display: block;
  align-items: center;
  justify-content: center;
}
</style>
