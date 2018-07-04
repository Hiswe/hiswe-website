<template lang="pug">
article.webapp
  figure.webapp__logo
    a(:href="github")
      slot(name="logo")
    figcaption
      a(href="github") website
  h3.webapp__title {{name}}
  p.webapp__description
    slot(name="description")
  slot
</template>

<style lang="scss" scoped>
</style>


<script>
export default {
  name: `hiswe-webapp`,
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    github() {
      return `https://github.com/Hiswe/${this.name}`
    },
  },
}
</script>

