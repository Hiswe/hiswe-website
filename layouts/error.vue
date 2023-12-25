<script>
export default {
  name: `PageNotFound`,
  layout: `error-layout`,
  props: [`error`],
}
</script>

<template>
  <section class="page-content">
    <h1>{{ error.statusCode }}</h1>
    <h2 v-if="error.statusCode === 404">
      not found
    </h2>
    <h2 v-else>
      {{ error.message }}
    </h2>
    <NuxtLink to="/" exact="exact">
      back
    </NuxtLink>
  </section>
</template>

<style lang="scss" scoped>
.page-content {
  height: calc(100vh - var(--navigation-height) - var(--vh-offset));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 5rem;
  font-weight: 300;
  margin: 0;
}
a {
  color: var(--c-accent);
}
</style>
