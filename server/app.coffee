path          = require 'path'
flash         = require 'connect-flash'
morgan        = require 'morgan' # logger
favicon       = require 'serve-favicon'
express       = require 'express'
session       = require 'cookie-session'
compress      = require 'compression'
bodyParser    = require 'body-parser'
cookieParser  = require 'cookie-parser'
errorhandler  = require 'errorhandler'

log           = '[BOOT]'
rev           = require './datas/rev-manifest.json'
conf          = require './settings'
icons         = require './datas/hiswe-icons.json'
secret        = 'The best color is pink'

module.exports = ->

  # Create Server
  app = express()
  console.log log.debug, 'Setup application'

  # Configure expressjs
  app.set 'views', path.join(__dirname , '../views')
  app.set 'view engine', 'jade'

  # Set some locals
  app.locals.env          = app.get('env')
  app.locals.appName      = conf.APP_NAME
  app.locals.assets       = rev
  app.locals.icons        = icons

  # Middleware
  app.use compress() # gzip
  app.use bodyParser()
  app.use favicon(path.join(__dirname , '../public/media/favicon.png'))
  app.use cookieParser(secret)
  app.use session({ maxAge: 60000, secret: secret})
  app.use flash()

  # Static
  console.log log.debug, 'Setup assets'
  require('./asset')(app)

  # Routing after static…
  console.log log.debug, 'Setup routes'
  require('./routing')(app)

  # logs
  if app.get('env') isnt 'production'
    app.use errorhandler()
    app.use morgan('tiny')

  return app
