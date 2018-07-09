'use strict'

const rc = require('rc')

const pkg = require('../package.json')

const config = rc(`hiswe`, {
  email: {
    transport: {
      host: `localhost`,
      port: 1025,
      // Maildev config for Nodemailer
      // • https://danfarrelly.nyc/MailDev/#configure
      ignoreTLS: true,
    },
    options: {
      from: `Mr contact dev <contact@hiswe.pouic>`,
    },
  },
})

config.VERSION = pkg.version

config.HOST = config.HOST || process.env.HOST || `127.0.0.1`
config.PORT = config.PORT || process.env.PORT || 3000

config.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev = config.NODE_ENV === `development`
config.isProd = config.NODE_ENV === `production`

module.exports = config
