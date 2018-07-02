<template lang="pug">
.home
  hiswe-home-header
  hiswe-service(title="dev-elopment")
    template(slot="description")
      | building<br>web application
    ul
      li reactive applications
      li data persistence
      li fast rendering with universal application
  hiswe-service(title="inte-gration")
    template(slot="description")
      | from webdesign<br>to webpage
    ul
      li optimized for fast loading &amp; rendering
      li bring your design to life with animations
      li clean javascript code
  hiswe-service(title="web-design")
    template(slot="description")
      | make<br>efficiant UX
    ul
      li fast delivery
      li simple &amp; nice experience for users
      li design for every screen size with responsive design
  hiswe-techs
  hiswe-contact
</template>

<style lang="scss" scoped>
</style>

<script>
import HisweHeader from '~/nuxt-components/home/header.vue'
import HisweService from '~/nuxt-components/home/service.vue'
import TechSection from '~/nuxt-components/home/techs.vue'

export default {
  name: `page-home`,
  components: {
    'hiswe-home-header': HisweHeader,
    'hiswe-service': HisweService,
    'hiswe-techs': TechSection,
  },
}
</script>
