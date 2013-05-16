express = require 'express'
expose  = require 'express-expose'
path    = require 'path'
nconf   = require 'nconf'

module.exports = (app) ->
  # Configure expressjs
  app.configure ->
    app.set 'appName', nconf.get('APP_NAME')
    app.locals.appName  = nconf.get('APP_NAME')
    app.locals.env      = app.get('env')

    app.set 'appDirname', nconf.get('path')
    app.set 'views', path.join( __dirname, '/../views')
    app.set 'view engine', 'jade'

    app.use express.compress() # gzip
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.favicon()

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
