import pkg from './package.json'
import rc from 'rc'

const config = rc(`hiswe`)

const NAME = `hiswe website`
const IS_PROD = process.env.NODE_ENV === `production`
// const IS_DEV = !isProd

export default {
  router: {
    middleware: [`reset-form`, `handle-server-errors`],
  },
  loading: {
    color: `hsl(332, 100%, 50%)`,
    height: `5px`,
  },
  css: [
    `@/nuxt-assets/css/global.scss`,
    `@/nuxt-assets/css/page-transitions.scss`,
  ],
  modules: [
    [
      `nuxt-sass-resources-loader`,
      [`@/nuxt-assets/css/scss-vars.scss`, `@/nuxt-assets/css/scss-mixin.scss`],
    ],
  ],
  plugins: [
    `@/nuxt-plugins/global-components.js`,
    { src: `@/nuxt-plugins/browser.js`, ssr: false },
  ],
  head: {
    titleTemplate: 'Hiswe – %s',
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      { hid: `author`, name: `author`, content: pkg.author },
      { hid: `description`, name: `description`, content: pkg.description },
      // open graph
      { hid: `og:title`, name: `og:title`, content: NAME },
      { hid: `og:type`, name: `og:type`, content: `website` },
      {
        hid: `og:description`,
        name: `og:description`,
        content: pkg.description,
      },
      { hid: `og:url`, name: `og:url`, content: pkg.homepage },
      // twitter
      { hid: `twitter:card`, name: `twitter:card`, content: `summary` },
      { hid: `twitter:site`, name: `twitter:site`, content: `@hiswehalya` },
      {
        hid: `twitter:creator`,
        name: `twitter:creator`,
        content: `@hiswehalya`,
      },
    ],
    link: [{ rel: `icon`, type: `image/png`, href: `/favicon.png` }],
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit`,
        async: true,
        defer: true,
      },
    ],
  },
}
