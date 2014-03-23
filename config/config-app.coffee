express = require 'express'
expose  = require 'express-expose'
path    = require 'path'
flash   = require 'connect-flash'

conf    = require('rc')('HISWE')

module.exports = (app) ->
  # Configure expressjs
  app.configure ->
    app.set 'appName', conf.APP_NAME
    app.locals.appName  = conf.APP_NAME
    app.locals.env      = app.get('env')

    app.set 'appDirname', conf.PATH
    app.set 'views', path.join( __dirname, '/../views')
    app.set 'view engine', 'jade'

    app.use express.compress() # gzip
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.favicon()

    # flash messages
    app.use express.cookieParser('hiswe rocks')
    app.use express.session({ cookie: { maxAge: 60000 }})
    app.use flash()

    # Stylus & CoffeeScript
    require('./asset')(app)

    # routing after static…
    app.use app.router

  # logs
  app.configure 'production', ->
    app.use express.errorHandler()

  app.configure 'development', ->
    app.use express.errorHandler({ dumpExceptions: true, showStack: true })
    app.use express.logger()

  return app
