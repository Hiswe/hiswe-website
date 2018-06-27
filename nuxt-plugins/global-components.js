import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import SvgIcons from '~/nuxt-components/svg-icons'

Vue.component(`hiswe-icon`, SvgIcons)
Vue.use(VueAxios, axios)

const DATE_FORMAT = {
  day: `2-digit`,
  month: `2-digit`,
  year: `numeric`,
}
Vue.filter('localDate', function(value) {
  const date = new Date(value)
  return date.toLocaleDateString(`en-GB`, DATE_FORMAT)
})
