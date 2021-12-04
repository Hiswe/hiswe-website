import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const pkg = require('./package.json')

const NAME = `hiswe website`

export default {
  telemetry: false,
  router: {
    middleware: [`reset-form`, `handle-server-errors`],
  },
  loading: {
    color: `hsl(332, 100%, 50%)`,
    height: `5px`,
  },
  css: [`@/assets/css/global.scss`, `@/assets/css/page-transitions.scss`],
  modules: [`@nuxtjs/style-resources`, `@nuxt/http`],
  styleResources: {
    scss: [`@/assets/css/scss-vars.scss`, `@/assets/css/scss-mixin.scss`],
  },
  plugins: [{ src: `@/plugins/browser.js`, ssr: false }],
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
  },
}
