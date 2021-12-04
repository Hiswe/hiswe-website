import Vue from 'vue'

import SvgIcons from '~/components/svg-icons'
import TechLogs from '~/components/svg-tech-logos'
import HisweMainContent from '~/components/main-content.vue'
import Contact from '~/components/contact'
import Social from '~/components/social'

import TwoLineTitle from '~/components/ui/two-line-title'
import TwoColumnHeader from '~/components/ui/two-column-header'

Vue.component(`hiswe-icon`, SvgIcons)
Vue.component(`hiswe-tech-logo`, TechLogs)
Vue.component(`hiswe-title`, TwoLineTitle)
Vue.component(`hiswe-header-content`, TwoColumnHeader)

Vue.component(`hiswe-contact`, Contact)
Vue.component(`hiswe-social`, Social)
Vue.component(`hiswe-main-content`, HisweMainContent)

const DATE_FORMAT = {
  day: `2-digit`,
  month: `2-digit`,
  year: `numeric`,
}
Vue.filter('localDate', function (value) {
  const date = new Date(value)
  return date.toLocaleDateString(`en-GB`, DATE_FORMAT)
})
