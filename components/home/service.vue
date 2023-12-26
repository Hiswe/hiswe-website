<script setup lang="ts">
const props = defineProps<{
  id: string
  description: string
  icon?: string
}>()

defineSlots<{
  default(): any
  title(): any
}>()

const serviceId = computed(() => {
  if (!props.id)
    return false
  return `service--${props.id}`
})
</script>

<template>
  <dl
    class="service m-0 flex flex-col md:grid"
    :class="serviceId"
  >
    <dt class="service__title text-center font-bold text-4xl">
      <slot name="title" />
    </dt>
    <dd
      class="service__subtitle m-0 text-xl font-extralight"
      v-html="description"
    />
    <dd
      class="service__description
        text-xs lg:text-base lg:font-light
        m-0 pt-4 md:pt-0"
    >
      <slot />
    </dd>
  </dl>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.service {
  --service-title-align: left;
  --service-subtitle-align: right;
  --service-description-align: left;
  padding: var(--vertical-space) var(--gutter);

  @media #{$mq-medium} {
    padding: var(--vertical-space) 0;
    grid-template-rows: none;
    grid-row-gap: var(--half-gutter);
  }

}
.service__title {
  text-align: var(--service-title-align);
  grid-area: title;
}
.service__subtitle {
  text-align: var(--service-subtitle-align);
  grid-area: subtitle;
  order: -1;
}
.service__description {
  color: var(--service-description-color);
  text-align: var(--service-description-align);
  grid-area: description;
  align-self: end;

  :deep(ul) {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media #{$mq-small} {
    :deep(li) + li {
      padding-top: 0.5rem;
    }
  }
}

.service--development {
  @media #{$mq-small} {
    .service__description {
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

.service--integration {
  --service-title-align: right;
  --service-subtitle-align: left;
  --service-description-align: right;
  --service-description-columns: 2 / 14;

  @media #{$mq-small} {
    .service__description {
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

.service--webdesign {
  --service-subtitle-align: right;

  @media #{$mq-small} {
    .service__description {
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
</style>
