const NAME = `hiswe website`
const DESCRIPTION = `hiswe's personal website`
const HOMEPAGE = `https://hiswe.net/`
const AUTHOR = `Yannick “Hiswe” Aïvayan <yannick.aivayan@hiswe.net>`

export default defineNuxtConfig({
  telemetry: false,
  typescript: {
    typeCheck: true,
    strict: true,
  },
  router: {
    middleware: [
      // `reset-form`,
      // `handle-server-errors`
    ],
  },
  loading: {
    color: `hsl(332, 100%, 50%)`,
    height: `5px`,
  },
  css: [
    `@/assets/css/global.scss`,
    `@/assets/css/page-transitions.scss`,
  ],
  modules: [
    `nuxt-svgo`,
  ],
  serverMiddleware: [{
    path: `/api`,
    handler: `~/server-middleware/rest.js`,
  }],
  plugins: [],
  app: {
    pageTransition: { name: `page`, mode: 'out-in' },
    head: {
      titleTemplate: 'Hiswe – %s',
      meta: [
        { charset: `utf-8` },
        { name: `viewport`, content: `width=device-width, initial-scale=1` },
        { 'http-equiv': `X-UA-Compatible`, 'content': `IE=edge` },
        { hid: `author`, name: `author`, content: AUTHOR },
        { hid: `description`, name: `description`, content: DESCRIPTION },
        // open graph
        { hid: `og:title`, name: `og:title`, content: NAME },
        { hid: `og:type`, name: `og:type`, content: `website` },
        {
          hid: `og:description`,
          name: `og:description`,
          content: DESCRIPTION,
        },
        { hid: `og:url`, name: `og:url`, content: HOMEPAGE },
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
  },
})
