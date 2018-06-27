module.exports = {
  head: {
    // titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      // {meta(http-equiv="X-UA-Compatible", content="IE=edge")}
      // { hid: 'description', name: 'description', content: 'Meta description' }
    ],
  },
  css: [`@/nuxt-assets/css/global.scss`],
  plugins: [`@/nuxt-plugins/global-components.js`],
  build: {
    babel: {
      plugins: [`transform-object-rest-spread`],
    },
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
