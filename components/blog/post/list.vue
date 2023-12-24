<script setup lang="ts">
const { data, pending } = await useFetch(`/api/posts`)

const placeholders = Array
  .from({ length: 4 })
  .map((v, i) => ({
    id: `placeholder-${i}`,
  }))

const posts = computed(() => data.value?.posts ?? [])
</script>

<template>
  <Transition name="placeholder" appear mode="out-in">
    <TransitionGroup class="posts" name="list" tag="div" v-if="!pending" key="posts" appear>
      <BlogPostPreview v-for="post in posts" :key="post.published" :post="post" />
    </TransitionGroup>
    <div class="posts" v-else key="placeholders">
      <BlogPostPlaceholder v-for="placeholder in placeholders" :key="placeholder.id" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.posts {
  grid-area: posts;
  background: var(--c-primary-lightest);

  @media #{$mq-medium} {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }

  @media #{$mq-big} {
    grid-template-columns: repeat(4, 1fr);
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.placeholder-enter-active,
.placeholder-leave-active {
  transition: opacity 0.5s;
}

.placeholder-enter,
.placeholder-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;

  @for $i from 0 through 19 {
    &:nth-child(#{$i}) {
      transition-delay: $i * 0.075s;
    }
  }
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
