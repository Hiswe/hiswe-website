<script>
import HisweWebapp from '~/components/projects/webapp.vue'

export default {
  name: `hiswe-webapp-listing`,
  components: { HisweWebapp },
}
</script>

<template>
  <section class="web-apps">
    <HisweWebapp name="a-count">
      <template #logo>
        <img src="@/assets/logos/©a-count.svg" width="100" />
      </template>
      <template #description>
        <a
          href="http://www.acuriousanimal.com/2016/08/10/universal-applications.html"
          >Universal application
        </a>
        for simple account
      </template>
      <ul>
        <li>help to manage small structures quotations/invoice</li>
        <li>print directly from the browser</li>
        <li>
          powered by <a href="https://reactjs.org/">React</a>,
          <a href="https://koajs.com/">Koa</a>
          & <a href="https://www.postgresql.org/">PostgreSQL</a>
        </li>
      </ul>
    </HisweWebapp>
    <HisweWebapp name="thailpha">
      <template #logo>
        <img src="@/assets/logos/©thailpha.svg" width="100" />
      </template>
      <template #description>
        <a href="https://en.wikipedia.org/wiki/Progressive_Web_Apps">
          Progressive Web Application
        </a>
        of a Thai alphabet dictionary
      </template>
      <ul>
        <li>keep a list of any Thai character at any time</li>
        <li>can easily check similar-looking characters</li>
        <li>
          can be installed on any phone home without having to go to the
          apple/play store
        </li>
        <li>powered by <a href="https://reactjs.org/">React</a></li>
      </ul>
    </HisweWebapp>
    <HisweWebapp name="thaime">
      <template #logo>
        <img src="@/assets/logos/©thaime.svg" width="100" />
      </template>
      <template #description>
        <a href="https://en.wikipedia.org/wiki/Progressive_Web_Apps">
          Progressive Web Application
        </a>
        of a Thai clock & time converter
      </template>
      <ul>
        <li>
          two ways conversion from 24 to
          <a href="https://en.wikipedia.org/wiki/Six-hour_clock">
            6 hour clock system
          </a>
        </li>
        <li>days & months dictionary</li>
        <li>
          two ways conversion from
          <a href="https://en.wikipedia.org/wiki/Buddhist_calendar">Buddhist</a>
          to
          <a href="https://en.wikipedia.org/wiki/Gregorian_calendar">
            Gregorian
          </a>
          calendar
        </li>
        <li>powered by <a href="https://vuejs.org">Vue</a></li>
      </ul>
    </HisweWebapp>
  </section>
</template>

<style lang="scss" scoped>
.web-apps {
  background: white;

  @media #{$mq-big} {
    display: grid;
    padding: 4rem 0 2rem;
    grid-template-columns: 1fr 9fr 1fr 9fr 1fr 9fr 1fr;
    grid-template-areas: '. first . second . third .';
  }
}
.webapp {
  &:nth-child(1) {
    grid-area: first;
  }
  &:nth-child(2) {
    grid-area: second;
  }
  &:nth-child(3) {
    grid-area: third;
  }
}
</style>
