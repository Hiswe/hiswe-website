express = require 'express'
path    = require 'path'
flash   = require 'connect-flash'
rev     = require './datas/rev-manifest.json'

conf    = require('rc')('HISWE')

module.exports = (app) ->
  # Configure expressjs
  app.configure ->
    app.set 'appName', conf.APP_NAME

    if conf.LIVERELOAD? and typeof conf.LIVERELOAD is 'string'
      livereload = conf.LIVERELOAD is 'true'
    else if conf.LIVERELOAD? and typeof conf.LIVERELOAD is 'boolean'
      livereload = conf.LIVERELOAD
    else
      livereload = false

    # Set some locals
    app.locals.LIVERELOAD   = livereload
    app.locals.env          = app.get('env')
    app.locals.appName      = conf.APP_NAME
    app.locals.assets       = rev

    app.set 'appDirname', conf.PATH
    app.set 'views', path.join( __dirname, '/../views')
    app.set 'view engine', 'jade'

    app.use express.compress() # gzip
    app.use express.urlencoded()
    app.use express.json()
    app.use express.methodOverride()
    app.use express.favicon(__dirname + '/../public/media/favicon.png')

    # flash messages
    app.use express.cookieParser('hiswe rocks')
    app.use express.session({ cookie: { maxAge: 60000 }})
    app.use flash()

    # static
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
