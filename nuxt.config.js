module.exports = {
  head: {
    // titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      // { hid: 'description', name: 'description', content: 'Meta description' }
    ],
  },
  css: [`@/nuxt-assets/css/global.scss`],
  plugins: [`@/nuxt-plugins/global-components.js`],
  build: {
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            // processing custom properties make them fail
            customProperties: false,
          },
        },
      },
    },
  },
}
