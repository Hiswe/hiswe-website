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
  --servive-description-pad-size: calc(var(--gutter) * 3);
  --service-description-pad-left: var(--servive-description-pad-size);
  --service-description-pad-right: 0;

  padding: var(--gutter);
  margin: 0;
  background: var(--servive-background);
  color: var(--servive-color, white);
  display: flex;
  flex-direction: column;

  &--development {
    --servive-background: var(--c-primary-lighter);
    --service-title-color: var(--c-primary-darkest);
    color: var(--c-primary-darker);
  }
  &--integration {
    --servive-background: var(--c-primary);
    --service-title-align: right;
    --service-subtitle-align: left;
    --service-description-align: right;
    --service-description-pad-left: 0;
    --service-description-pad-right: var(--servive-description-pad-size);
  }
  &--webdesign {
    --servive-background: var(--c-accent);
    --service-description-color: white;
    color: var(--c-accent-lightest);
  }

  &__title {
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    text-align: var(--service-title-align);
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
    order: -1;
    text-align: var(--service-subtitle-align);
  }
  &__description {
    color: var(--service-description-color);
    text-align: var(--service-description-align);
    padding-left: var(--service-description-pad-left);
    padding-right: var(--service-description-pad-right);
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
