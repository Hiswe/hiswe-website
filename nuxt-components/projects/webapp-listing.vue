<template lang="pug">
  section.web-apps
    hiswe-webapp(name="a-count")
      template(slot="logo")
        img(src="@/nuxt-assets/logos/©a-count.svg" width="100")
      template(slot="description")
        a(href="http://www.acuriousanimal.com/2016/08/10/universal-applications.html") Universal application
        |   for simple account
      ul
        li help to manage small structures quotations/invoice
        li print directly from the browser
        li.
          powered by #[a(href="https://reactjs.org/") React],
          #[a(href="https://koajs.com/") Koa]
          & #[a(href="https://www.postgresql.org/") PostgreSQL]

    hiswe-webapp(name="thailpha")
      template(slot="logo")
        img(src="@/nuxt-assets/logos/©thailpha.svg" width="100")
      template(slot="description")
        a(href="https://en.wikipedia.org/wiki/Progressive_Web_Apps") Progressive Web Application
        |  of a Thai alphabet dictionary
      ul
        li keep a list of any Thai character at any time
        li can easily check similar-looking characters
        li can be installed on any phone home without having to go to the apple/play store
        li powered by <a href="https://reactjs.org/">React</a>

    hiswe-webapp(name="thaime")
      template(slot="logo")
        img(src="@/nuxt-assets/logos/©thaime.svg" width="100")
      template(slot="description")
        .
          #[a(href="https://en.wikipedia.org/wiki/Progressive_Web_Apps") Progressive Web Application]
          of a Thai clock & time converter
      ul
        li.
          two ways conversion from 24 to
          #[a(href="https://en.wikipedia.org/wiki/Six-hour_clock") 6 hour clock system]
        li days & months dictionary
        li.
          two ways conversion from
          #[a(href="https://en.wikipedia.org/wiki/Buddhist_calendar") Buddhist]
          to
          #[a(href="https://en.wikipedia.org/wiki/Gregorian_calendar") Gregorian]
          calendar
        li.
          powered by #[a(href="https://vuejs.org") Vue]
</template>

<style lang="scss" scoped>
.web-apps {
  background: white;
}
</style>

<script>
import HisweWebapp from '~/nuxt-components/projects/webapp.vue'

export default {
  name: `hiswe-webapp-listing`,
  components: {
    'hiswe-webapp': HisweWebapp,
  },
}
</script>
