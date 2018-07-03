<template lang="pug">
dl(:class="`service ${id}`")
  dt.service__title: hiswe-title(:text="title")
  dd.service__subtitle
    slot(name="description")
  dd.service__description
    slot
</template>

<style lang="scss" scoped>
.service {
  $root: &;
  --servive-background: var(--c-primary);
  --service-title-color: currentColor;
  --service-title-align: left;
  --service-subtitle-align: right;
  --service-description-color: currentColor;
  --service-description-align: left;
  --service-description-columns: 4 / 16;
  --service-columns: 16;

  margin: 0;
  padding: var(--gutter) 0;
  background: var(--servive-background);
  color: var(--servive-color, white);
  display: grid;
  grid-template-columns: repeat(var(--service-columns), 1fr);
  grid-template-rows:
    [sub] auto [sub-end title] auto [title-end desc] auto
    [desc-end];

  @media #{$mq-medium} {
    padding: 0;
    grid-template-rows: none;
    grid-auto-rows: var(--grid-size);
  }

  &--development {
    --servive-background: var(--c-primary-lighter);
    --service-title-color: var(--c-primary-darkest);
    color: var(--c-primary-darker);

    @media #{$mq-medium} {
      --service-columns: 12;
      --service-subtitle-align: left;

      #{$root}__title {
        grid-area: 4 / 2 / 7 / 6;
      }
      #{$root}__subtitle {
        grid-area: 2 / 2 / 4 / 6;
      }
      #{$root}__description {
        grid-area: 2 / 7 / 4 / 12;
      }
    }
  }
  &--integration {
    --servive-background: var(--c-primary);
    --service-title-align: right;
    --service-subtitle-align: left;
    --service-description-align: right;
    --service-description-columns: 2 / 14;

    @media #{$mq-medium} {
      --service-columns: 6;
      --service-description-align: left;
      --service-title-align: left;

      #{$root}__title {
        grid-area: 12 / 2 / 15 / 6;
      }
      #{$root}__subtitle {
        grid-area: 10 / 2 / 12 / 6;
      }
      #{$root}__description {
        grid-area: 6 / 2 / 10 / 6;
      }
    }
  }
  &--webdesign {
    --servive-background: var(--c-accent);
    --service-description-color: white;
    --service-subtitle-align: left;
    color: var(--c-accent-lightest);

    @media #{$mq-medium} {
      --service-columns: 18;
      #{$root}__title {
        grid-area: 4 / 9 / 6 / 18;
      }
      #{$root}__subtitle {
        grid-area: 2 / 9 / 3 / 18;
      }
      #{$root}__description {
        grid-area: 2 / 4 / 7 / 8;
      }
    }
  }

  &__title {
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    text-align: var(--service-title-align);
    grid-row: title / title-end;
    grid-column: 2 / 16;
  }
  .two-line-title {
    color: var(--service-title-color);
  }
  &__subtitle,
  &__description {
    margin: 0;
  }
  &__subtitle {
    font-size: 1.25rem;
    line-height: 1.2;
    font-weight: 200;
    text-align: var(--service-subtitle-align);
    grid-row: sub / sub-end;
    grid-column: 3 / 15;
  }
  &__description {
    color: var(--service-description-color);
    text-align: var(--service-description-align);
    padding-top: var(--gutter);
    grid-row: desc / desc-end;
    grid-column: var(--service-description-columns);

    @media #{$mq-medium} {
      padding-top: 0;
    }

    ul {
      list-style: none;
      padding: 0;
      font-size: 0.8rem;
    }
    @media #{$mq-small} {
      li + li {
        padding-top: 0.5rem;
      }
    }
  }
}
</style>


<script>
export default {
  name: `hiswe-service`,
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      require: false,
    },
  },
  computed: {
    id() {
      if (!this.title) return false
      const name = this.title.replace(`-`, ``).replace(` `, `-`)
      return `service--${name}`
    },
  },
}
</script>
