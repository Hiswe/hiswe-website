<script>
export default {
  name: `hiswe-webapp`,
  props: {
    name: { type: String, required: true },
    url: { type: String, default: `` },
  },
  computed: {
    github() {
      return `https://github.com/Hiswe/${this.name}`
    },
  },
}
</script>

<template>
  <article class="webapp" :class="`webapp--${name}`">
    <figure class="webapp__logo-block">
      <a :href="github" :class="`webapp__logo webapp__logo--${name}`">
        <slot name="logo" />
      </a>
      <figcaption class="webapp__logo-caption">
        <a :href="github">github</a>
      </figcaption>
    </figure>
    <h3 class="webapp__title">
      <a :href="url || github">{{ name }}</a>
    </h3>
    <p class="webapp__description">
      <slot name="description" />
    </p>
    <slot />
  </article>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@import 'assets/css/scss-vars';

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
    grid-template-columns: 1fr 5fr;
    width: percentage(math.div(2, 3));
    grid-auto-rows: auto;
    grid-gap: 1rem;
    grid-template-areas:
      'logo .'
      'logo title'
      'logo description'
      'list    list';

    &:nth-child(even) {
      margin-left: percentage(math.div(1, 3));
    }

    +.webapp {
      margin-top: 2rem;
    }
  }

  ul {
    color: var(--c-primary-darker);
    padding: 0 percentage(math.div(1, 9));
    grid-area: list;

    @media #{$mq-medium-only} {
      display: grid;
      grid-template-columns: 6fr 1fr 6fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        'first . second'
        'third . fourth';
      list-style: none;
      padding: 0;
      margin: 0;

      li:nth-child(odd) {
        text-align: right;
        padding-left: 1rem;
      }

      li:nth-child(even) {
        padding-right: 1rem;
      }

      li:nth-child(2)~li {
        padding-top: 0.75rem;
      }

      li:nth-child(1) {
        grid-area: first;
      }

      li:nth-child(2) {
        grid-area: second;
      }

      li:nth-child(3) {
        grid-area: third;
      }

      li:nth-child(3):last-child,
      li:nth-child(4) {
        grid-area: fourth;
        text-align: left;
        padding-left: 0;
        padding-right: 1rem;
      }
    }
  }
}

.webapp__logo-block {
  margin: 0 auto;
  width: percentage(math.div(1, 4));
  grid-area: logo;
  position: relative;
  top: grid-size(-1);

  @media #{$mq-medium-only} {
    position: static;
    width: 100%;
  }

  @media #{$mq-big} {
    width: percentage(math.div(1, 3));
  }
}

.webapp__logo {
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
    transition: color 0.25s, background-color 0.25s;

    @media #{$mq-medium} {
      height: 2rem;
    }

    &:hover {
      color: white;
      background-color: var(--c-accent);
    }
  }
}

.webapp__title {
  text-align: center;
  margin-top: 0;
  grid-area: title;

  @media #{$mq-medium-only} {
    align-self: end;
    margin: 0;
    line-height: 1;
  }

  a {
    color: var(--c-accent);
    text-decoration: none;
    text-transform: uppercase;
    font-size: 2.5rem;
    transition: color 0.25s;

    &:hover {
      color: var(--c-primary-darker);
    }
  }
}

.webapp__description {
  text-align: center;
  font-size: 1.2rem;
  color: var(--c-primary-darkest);
  padding: 0 percentage(math.div(1, 9));
  grid-area: description;
  align-self: end;

  @media #{$mq-medium-only} {
    padding: 0 1rem 0 0;
    margin: 0;
  }
}
</style>
