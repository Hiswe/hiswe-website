<template lang="pug">
dl(:class="`npm-module npm-module--${name}`")
  dt.npm-module__title {{name}}
  dd.npm-module__description
    slot
  dd.npm-module__link
    a(:href="`https://www.npmjs.com/package/${name}`") see on npm
</template>

<style lang="scss" scoped>
.npm-module {
  background: var(--c-primary-lighter);
  color: var(--c-primary-darker);
  margin: 0;

  @media #{$mq-medium} {
    display: flex;
    flex-direction: column;
  }

  &--vh-check {
    @media #{$mq-small} {
      margin-bottom: grid-size(-2);
      position: relative;
    }
  }
  &__title {
    text-align: center;
    font-size: 2rem;
    line-height: 1;
    font-weight: 900;
    text-transform: uppercase;
    padding: var(--half-gutter);
    flex: 0 0 auto;

    @media #{$mq-medium} {
      font-size: 1.75rem;
    }
  }
  &__description,
  &__link {
    margin: 0;
  }
  &__description {
    padding: 0 var(--gutter);
    flex: 1 0 auto;

    @media #{$mq-medium} {
      text-align: center;
    }
  }
  &__link {
    padding: var(--gutter);
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
}
</style>


<script>
export default {
  name: `hiswe-npm-module`,
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

