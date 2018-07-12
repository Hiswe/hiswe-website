<template lang="pug">
  article.post: a.post__link(:href="post.link")
    .post__cover(:style="{'background-image': `url(${post.cover})`}")
    .post__content
      time.post__date(:datetime="post.published") {{post.published | localDate}}
      h3.post__title {{post.title}}
      .post__summary(v-html="post.summary")
</template>

<style lang="scss" scoped>
.post {
  $root: &;
  background: var(--c-primary-lightest);
  height: 100%;

  @media #{$mq-medium} {
    background: white;
  }
  @media #{$mq-medium-only} {
    &:nth-child(3n + 1) {
      grid-column: span 2;

      a {
        display: flex;
      }

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
      a {
        display: flex;
      }

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
  &__link {
    text-decoration: none;
    position: relative;
    display: block;
    height: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      transition: 0.5s box-shadow;
      pointer-events: none;
      z-index: 2;
    }
    &:hover {
      color: currentColor;

      &::before {
        box-shadow: inset 0 0 0 10px var(--c-accent);
      }
    }
  }
  &__content {
    flex-grow: 1;
  }
  &__cover {
    min-height: 130px;
    display: block;
    margin: 0 auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: var(--c-primary);
    background-size: 240px;
    transition: background-size 0.5s;
  }
  &__date {
    display: block;
    text-align: center;
    margin: 0;
    font-size: 1.25rem;
    color: var(--c-primary-darker);
    padding: 1rem 0 0;
    @media #{$mq-medium} {
      font-size: 1rem;
    }
  }
  &__title {
    padding: 1rem 1rem 0;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.75rem;
    line-height: 1.2;
    color: var(--c-accent);

    @media #{$mq-medium} {
      font-size: calc(2.5vw + 0.5rem);
    }
    @media #{$mq-big} {
      font-size: 1.5rem;
    }
  }
  &__summary {
    text-align: center;
    padding: 1rem 1rem 2rem;

    @media #{$mq-medium-only} {
      font-size: calc(1vw + 0.5rem);
    }
  }
}
</style>

<script>
export default {
  name: `hiswe-blog-post-preview`,
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

