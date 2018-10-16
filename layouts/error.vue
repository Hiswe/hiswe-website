<script>
export default {
  name: `page-not-found`,
  props: [`error`],
  layout: `error-layout`,
}
</script>

<template lang="pug">
section.page-content
  h1 {{error.statusCode}}
  h2(v-if="error.statusCode === 404") not found
  h2(v-else) {{error.message}}
  router-link( to="/" exact) back
  //- h2(v-if="error.statusCode === 404") {{$t(`404`)}}
  //- h2(v-else) {{$t(`other`)}}
  //- router-link( to="/" exact) {{$t(`back`)}}
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
