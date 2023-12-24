<script>
const DATE_FORMAT = {
  day: `2-digit`,
  month: `2-digit`,
  year: `numeric`,
}

export default {
  name: `hiswe-blog-post-preview`,
  props: {
    post: { type: Object, required: true },
  },
  computed: {
    displayedDate() {
      const date = new Date(this.post.published)
      return date.toLocaleDateString(`en-GB`, DATE_FORMAT)
    },
  },
}
</script>

<template>
  <article class="post">
    <a class="post__link" :href="post.link">
      <div class="post__cover" :style="{ 'background-image': `url(${post.cover})` }" />
      <div class="post__content">
        <time class="post__date" :datetime="post.published">
          {{ displayedDate }}
        </time>
        <h3 class="post__title">{{ post.title }}</h3>
        <div class="post__summary" v-html="post.summary"></div>
      </div>
    </a>
  </article>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

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
}

.post__link {
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

.post__content {
  flex-grow: 1;
}

.post__cover {
  min-height: 130px;
  display: block;
  margin: 0 auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: var(--c-primary);
  background-size: 240px;
  transition: background-size 0.5s;
}

.post__date {
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

.post__title {
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

.post__summary {
  text-align: center;
  padding: 1rem 1rem 2rem;

  @media #{$mq-medium-only} {
    font-size: calc(1vw + 0.5rem);
  }
}</style>
