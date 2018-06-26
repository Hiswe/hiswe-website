module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/nuxt-koa.js'
    return config
  },
}
