'use strict'

const rc = require('rc')

const pkg = require('../package.json')

const config = rc(`hiswe`, {})

config.VERSION = pkg.version

config.PORT = config.PORT || process.env.PORT || 3456

config.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev = config.NODE_ENV === `development`
config.isProd = config.NODE_ENV === `production`

module.exports = config
