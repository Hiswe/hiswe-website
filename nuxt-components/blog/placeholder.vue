<script>
export default {
  name: `hiswe-blog-post-placholder`,
}
</script>

<template lang="pug">
  article.post-placholder
    .post-placholder__cover
    .post-placholder__content
      .post-placholder__date
      .post-placholder__title
      .post-placholder__summary
</template>

<style lang="scss" scoped>
.post-placholder {
  $root: &;
  background: var(--c-primary-lightest);
  height: 100%;

  @media #{$mq-medium} {
    background: white;
  }
  @media #{$mq-medium-only} {
    &:nth-child(3n + 1) {
      grid-column: span 2;
      display: flex;

      #{$root}__cover {
        width: 130px;
        flex: 0 0 auto;
      }
    }
  }
  @media #{$mq-big} {
    &:nth-child(8n + 3),
    &:nth-child(8n + 4),
    &:nth-child(8n + 5),
    &:nth-child(8n + 8) {
      grid-column: span 2;
      display: flex;

      #{$root}__cover {
        width: 130px;
        flex: 0 0 auto;
      }
    }
    &:nth-child(8n + 1),
    &:nth-child(8n + 2),
    &:nth-child(8n + 6),
    &:nth-child(8n + 7) {
      grid-row: span 2;
    }
  }
  &__cover,
  &__content,
  &__date,
  &__title {
    animation: blink-animation linear 0.65s infinite alternate;
  }
  &__cover {
    min-height: 130px;
    display: block;
    margin: 0 auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: var(--c-primary-lighter);
    background-size: 240px;
    transition: background-size 0.5s;
  }
  &__content {
    flex-grow: 1;
  }
  &__date,
  &__title {
    background: var(--c-primary-lightest);
  }
  &__date {
    display: block;
    text-align: center;
    height: 1.25rem;
    margin: 1rem auto 0;
    width: 6rem;
    @media #{$mq-medium} {
      font-size: 1rem;
    }
  }
  &__title {
    margin: 1rem auto 0;
    max-width: 200px;
    text-align: center;
    text-transform: uppercase;
    height: 1.75rem;
    line-height: 1.2;

    @media #{$mq-medium} {
      font-size: calc(2.5vw + 0.5rem);
    }
    @media #{$mq-big} {
      font-size: 1.5rem;
    }
  }
  &__summary {
    text-align: center;
    margin: 1rem 1rem 2rem;
    background: linear-gradient(
      to bottom,
      var(--c-primary-lightest) 33%,
      transparent 33%,
      transparent 66%,
      var(--c-primary-lightest) 66%
    );
    height: 3rem;

    @media #{$mq-medium-only} {
      font-size: calc(1vw + 0.5rem);
    }
  }
}
@keyframes blink-animation {
  to {
    opacity: 0.7;
  }
}
</style>
