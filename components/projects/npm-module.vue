<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <dl class="npm-module" :class="`npm-module--${name}`">
    <dt class="npm-module__title">{{ name }}</dt>
    <dd class="npm-module__description">
      <slot />
    </dd>
    <dd class="npm-module__link">
      <a :href="`https://www.npmjs.com/package/${name}`">see on npm</a>
    </dd>
  </dl>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.npm-module {
  background: var(--c-primary-lighter);
  color: var(--c-primary-darker);
  margin: 0;

  @media #{$mq-medium} {
    display: flex;
    flex-direction: column;
  }
}

.npm-module--vh-check {
  @media #{$mq-small} {
    margin-bottom: grid-size(-2);
    position: relative;
  }
}

.npm-module__title {
  text-align: center;
  font-size: 2rem;
  line-height: 1;
  font-weight: 900;
  text-transform: uppercase;
  padding: var(--half-gutter);
  flex: 0 0 auto;

  @media #{$mq-medium} {
    padding-top: var(--vertical-space);
    font-size: 1.75rem;
  }
}

.npm-module__description,
.npm-module__link {
  margin: 0;
}

.npm-module__description {
  padding: 0 var(--gutter);
  flex: 1 0 auto;

  @media #{$mq-medium} {
    text-align: center;
  }
}

.npm-module__link {
  padding: var(--gutter) var(--gutter) var(--vertical-space);
  flex: 0 0 auto;

  a {
    display: block;
    text-align: center;
    max-width: 150px;
    margin: 0 auto;
    background: white;
    color: var(--c-accent);
    padding: 0.75em 1em;
    text-decoration: none;
    transition: color 0.25s, background-color 0.25s;

    &:hover {
      color: white;
      background-color: var(--c-accent);
    }
  }
}
</style>
