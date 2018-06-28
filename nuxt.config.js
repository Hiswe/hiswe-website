module.exports = {
  head: {
    // titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      // { hid: 'description', name: 'description', content: 'Meta description' }
    ],
  },
  css: [`@/nuxt-assets/css/global.scss`],
  // inject scss files in every module
  // • https://github.com/anteriovieira/nuxt-sass-resources-loader
  // • https://hackernoon.com/how-i-use-scss-variables-mixins-functions-globally-in-nuxt-js-projects-while-compiling-css-utilit-58bb6ff30438
  modules: [[`nuxt-sass-resources-loader`, `@/nuxt-assets/css/scss-vars.scss`]],
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
