<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    tag?: string
  }>(),
  {
    tag: `h3`,
  },
)
const TITLE_REGEX = /^(\w+)[\s-](.+)$/
const TITLE_WITH_SPACE_REGEX = /^\w+\s.+$/

const classNames = computed(() => {
  const hasSpace = TITLE_WITH_SPACE_REGEX.test(props.text)
  return {
    'first-line': true,
    'has-space': hasSpace,
    'has-dash': !hasSpace,
  }
})
const firstLine = computed(() => {
  return TITLE_REGEX.exec(props.text)?.[1]
})
const secondLine = computed(() => {
  return TITLE_REGEX.exec(props.text)?.[2]
})
</script>

<template>
  <component :is="tag" class="two-line-title">
    <span :class="classNames" v-text="firstLine" />
    <span class="second-line" v-text="secondLine" />
  </component>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.two-line-title {
  line-height: 1;
  margin: 0;

  @media #{$mq-small} {
    font-size: 6vw;
  }

  @media #{$mq-medium} {
    line-height: 0.85;
    font-size: calc(2vw + 0.5rem);
  }

  @media #{$mq-big} {
    font-size: 1.5rem;
  }
}

.first-line {
  font-weight: 900;
  font-size: 2em;
  text-transform: uppercase;
}

.has-dash::after {
  content: '-';
}

.second-line {
  display: block;
  font-size: 1.5em;
  font-weight: 200;
}
</style>
