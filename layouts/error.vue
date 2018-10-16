<script>
// import { mapState } from 'vuex'

// const i18n = {
//   messages: {
//     en: {
//       404: `nothing there`,
//       other: `An error occurred`,
//       back: `back to homepage`,
//     },
//     fr: {
//       404: `rien ici`,
//       other: `Une erreur est survenue`,
//       back: `page d'accueil`,
//     },
//   },
// }

export default {
  // i18n,
  name: `page-not-found`,
  props: [`error`],
  // computed: mapState({
  //   robotoFont: state => state.settings.robotoFont,
  // }),
  // head() {
  //   return {
  //     htmlAttrs: {
  //       class: this.robotoFont ? `has-roboto` : ``,
  //     },
  //     link: this.robotoFont
  //       ? [
  //           {
  //             rel: `stylesheet`,
  //             href: `https://fonts.googleapis.com/css?family=Roboto:300,400,900`,
  //           },
  //         ]
  //       : [],
  //   }
  // },
}
</script>

<template lang="pug">
section.page-content
  h1 {{error.statusCode}}
  h2(v-if="error.statusCode === 404") 404
  h2(v-else) other
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
