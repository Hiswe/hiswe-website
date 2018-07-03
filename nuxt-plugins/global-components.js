import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import SvgIcons from '~/nuxt-components/svg-icons'
import TechLogs from '~/nuxt-components/svg-tech-logos'
import TwoLineTitle from '~/nuxt-components/two-line-title'
import Contact from '~/nuxt-components/contact'
import Social from '~/nuxt-components/social'

Vue.use(VueAxios, axios)

Vue.component(`hiswe-icon`, SvgIcons)
Vue.component(`hiswe-tech-logo`, TechLogs)
Vue.component(`hiswe-title`, TwoLineTitle)
Vue.component(`hiswe-contact`, Contact)
Vue.component(`hiswe-social`, Social)

const DATE_FORMAT = {
  day: `2-digit`,
  month: `2-digit`,
  year: `numeric`,
}
Vue.filter('localDate', function(value) {
  const date = new Date(value)
  return date.toLocaleDateString(`en-GB`, DATE_FORMAT)
})
