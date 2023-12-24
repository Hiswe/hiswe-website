<script setup lang="ts">
const props = defineProps<{
  name: string
  href: string
}>();

const iconName = computed(() => `tech/${props.name}`)
</script>

<template>
  <a class="tech__item" :href="href">
    <figure>
      <SvgIcon :name="iconName" class="icon" />
    </figure>
    <span>{{ name }}</span>
  </a>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

figure {
  display: block;
  margin: 0;
  background: var(--c-primary-lighter);
  height: calc(var(--grid-size) * 3);

  @media #{$mq-medium} {
    height: calc(var(--grid-size) * 2);
  }
}

.icon {
  display: block;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
  background: var(--c-primary);
  fill: var(--c-primary-darker);
  transition: background 0.25s, fill 0.25s;

  path {
    transition: fill 0.25s;
  }

  a:hover & {
    background: var(--c-accent-lighter);
    fill: var(--c-accent);
  }

  &-path-light {
    fill: var(--c-primary-lighter);

    a:hover & {
      fill: var(--c-accent-lightest);
    }
  }

  &-path-white {
    fill: var(--c-primary-lightest);
  }

  &-path-background {
    fill: var(--c-primary);

    a:hover & {
      fill: var(--c-accent-lighter);
    }
  }
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