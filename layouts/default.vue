<template lang="pug">
  main(role="main")
    hiswe-main-title
    hiswe-main-navigation
    nuxt
</template>

<script>
import MainTitle from '~/nuxt-components/main-title.vue'
import MainNavigation from '~/nuxt-components/main-navigation.vue'

export default {
  name: `default-layout`,
  components: {
    'hiswe-main-title': MainTitle,
    'hiswe-main-navigation': MainNavigation,
  },
}
</script>

