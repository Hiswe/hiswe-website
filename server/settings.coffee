rc      = require 'rc'
path    = require 'path'

pack    = require '../package.json'
log     = '[CONF]'
conf    = require '../config.coffee'
rcConf  = rc('hiswe', conf)

conf.version    = pack.version
conf.path       = path.join( __dirname, '/../')
# process.env.PORT is for Heroku
conf.PORT       = conf.PORT or process.env.PORT or 5000
conf.ENV        = conf.ENV  or process.env.NODE_ENV or 'development'
conf.isProd     = conf.ENV is 'production'

module.exports  = conf
