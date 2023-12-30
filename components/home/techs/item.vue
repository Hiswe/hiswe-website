<script setup lang="ts">
defineOptions({
  name: `HomeTechsItem`,
})

defineProps<{
  name: string
  href: string
}>()

defineSlots<{
  default(): any
}>()
</script>

<template>
  <a class="tech__item group block m-0 text-center decoration-none color-primary-lightest hover:color-accent-lighter" :href="href">
    <figure class="block m-0 bg-primary group-hover:bg-accent-lighter object-contain">
      <slot />
    </figure>
    <span class="block p-0 text-2xs">{{ name }}</span>
  </a>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

figure {
  height: calc(var(--grid-size) * 3);

  @media #{$mq-medium} {
    height: calc(var(--grid-size) * 2);
  }
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

span {
  height: var(--grid-size);
}
</style>
