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

  margin: 0;
  padding: var(--vertical-space) var(--gutter);
  background: var(--servive-background);
  color: var(--servive-color, white);
  display: flex;
  flex-direction: column;

  @media #{$mq-medium} {
    display: grid;
    padding: var(--vertical-space) 0;
    grid-template-rows: none;
    grid-row-gap: var(--half-gutter);
  }

  &--development {
    --servive-background: var(--c-primary-lighter);
    --service-title-color: var(--c-primary-darkest);
    color: var(--c-primary-darker);

    @media #{$mq-small} {
      #{$root}__description {
        padding-left: var(--two-gutter);
      }
    }
    @media #{$mq-medium} {
      --service-subtitle-align: left;
      grid-template-columns: 1fr repeat(2, 5fr) 1fr;
      grid-template-rows: 1fr repeat(2, auto);
      grid-template-areas:
        '. .        .           .'
        '. subtitle description .'
        '. title    description .';
    }
  }
  &--integration {
    --servive-background: var(--c-primary);
    --service-title-align: right;
    --service-subtitle-align: left;
    --service-description-align: right;
    --service-description-columns: 2 / 14;

    @media #{$mq-small} {
      #{$root}__description {
        padding-right: var(--two-gutter);
      }
    }
    @media #{$mq-medium} {
      --service-description-align: left;
      --service-title-align: left;
      grid-template-columns: 1fr 9fr 1fr;
      grid-template-rows: 1fr auto var(--gutter) repeat(2, auto);
      grid-template-areas:
        '. .           .'
        '. description .'
        '. . .'
        '. subtitle .'
        '. title    .';
    }
  }
  &--webdesign {
    --servive-background: var(--c-accent);
    --service-description-color: white;
    --service-subtitle-align: right;
    color: var(--c-accent-lightest);

    @media #{$mq-small} {
      #{$root}__description {
        padding-left: var(--two-gutter);
      }
    }
    @media #{$mq-medium} {
      --service-subtitle-align: left;
      grid-template-columns: 3fr 4fr 1fr 10fr;
      grid-template-rows: repeat(2, auto);
      grid-template-areas:
        '. description . subtitle'
        '. description . title';
    }
  }

  &__title {
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    text-align: var(--service-title-align);
    grid-row: title / title-end;
    grid-column: 2 / 16;
    grid-area: title;
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
    grid-area: subtitle;
    order: -1;
  }
  &__description {
    color: var(--service-description-color);
    text-align: var(--service-description-align);
    padding-top: var(--gutter);
    grid-row: desc / desc-end;
    grid-column: var(--service-description-columns);
    font-size: 0.8rem;
    grid-area: description;
    align-self: end;

    @media #{$mq-medium} {
      padding-top: 0;
    }

    @media #{$mq-big} {
      padding-top: 0;
      font-size: 1rem;
      font-weight: 300;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    @media #{$mq-small} {
      li + li {
        padding-top: 0.5rem;
      }
    }
  }
}
</style>
