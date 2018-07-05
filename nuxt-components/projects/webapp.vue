<template lang="pug">
article(:class="`webapp webapp--${name}`")
  figure.webapp__logo-block
    a(
      :href="github"
      :class="`webapp__logo webapp__logo--${name}`"
    )
      slot(name="logo")
    figcaption.webapp__logo-caption
      a(href="github") website
  h3.webapp__title: a(href="github") {{name}}
  p.webapp__description
    slot(name="description")
  slot
</template>

<style lang="scss" scoped>
.webapp {
  padding: 0 0 grid-size(1);
  background: var(--c-primary-lightest);

  @media #{$mq-small} {
    padding-bottom: 2rem;
    margin-bottom: 3rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media #{$mq-medium-only} {
    display: grid;
    grid-template-columns: 3fr 6fr 1fr 6fr;
    grid-template-rows: auto 2rem auto;
    grid-template-areas:
      'logo title .    description'
      'logo .     .    .'
      '.    list  list list';
  }

  &__logo-block {
    margin: 0 auto;
    width: percentage(1 / 4);
    grid-area: logo;
    position: relative;
    top: grid-size(-1);

    @media #{$mq-medium-only} {
      position: static;
      width: 100%;
    }

    @media #{$mq-big} {
      width: percentage(1 / 3);
    }
  }
  &__logo {
    display: block;

    &--a-count {
      background: #4d419b;
    }
    &--thailpha {
      background: #54009d;
    }
    &--thaime {
      background: #5a4c30;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &-caption a {
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      color: var(--c-accent);
      text-align: center;
      text-decoration: none;

      @media #{$mq-medium-only} {
        height: 2rem;
      }
    }
  }
  &__title {
    text-align: center;
    margin-top: 0;
    grid-area: title;

    @media #{$mq-medium-only} {
      text-align: right;
      align-self: end;
      margin: 0;
      line-height: 1;
    }

    a {
      color: var(--c-accent);
      text-decoration: none;
      text-transform: uppercase;
      font-size: 2.5rem;
    }
  }
  &__description {
    text-align: center;
    font-size: 1.2rem;
    color: var(--c-primary-darkest);
    padding: 0 percentage(1 / 9);
    grid-area: description;
    align-self: end;

    @media #{$mq-medium-only} {
      text-align: left;
      padding: 0 1rem 0 0;
      margin: 0;
    }
  }
  ul {
    color: var(--c-primary-darker);
    padding: 0 percentage(1 / 9);
    grid-area: list;

    @media #{$mq-medium-only} {
      display: grid;
      grid-template-columns: 6fr 1fr 6fr;
      grid-template-rows: auto 0.5rem auto;
      grid-template-areas:
        'first . second'
        '.     . .'
        'third . fourth';
      list-style: none;
      padding: 0;
      margin: 0;

      li:nth-child(1) {
        grid-area: first;
        text-align: right;
      }
      li:nth-child(2) {
        grid-area: second;
      }
      li:nth-child(3) {
        grid-area: third;
        text-align: right;
      }
      li:nth-child(3):last-child,
      li:nth-child(4) {
        grid-area: fourth;
        text-align: left;
      }
    }
  }
}
</style>

<script>
export default {
  name: `hiswe-webapp`,
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    github() {
      return `https://github.com/Hiswe/${this.name}`
    },
  },
}
</script>

