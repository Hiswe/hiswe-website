express = require 'express'
path    = require 'path'
nconf   = require 'nconf'
expose  = require 'express-expose'
stylus  = require 'stylus'
nib     = require 'nib'
hstrap  = require 'hstrap'

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

    # Connect before static…
    app.use require('connect-assets')()

    compileCss = (str, path) ->
      return stylus(str)
       .set('filename', path)
       .set('compress', false)
       .use(nib())
       .import('nib')
       .use(hstrap())
       .import('hstrap')

    app.use require('stylus').middleware({
      src: path.join( __dirname + '/../assets/css'),
      dest: path.join( __dirname + '/../public')
      compile: compileCss
    });

    if app.get('env') is 'production'
      maxAge = 2629800000 # 1 month
    else
      maxAge = 1
    assets  = path.join(__dirname, '/../public')
    app.use express.static(assets, {maxAge: maxAge})



    # expose some datas to the front app under bg namespace
    # options = {
    #   currencies: nconf.get('currencies')
    #   mapkey: nconf.get('MAP_API_KEY')
    #   analyticskey: nconf.get('ANALYTICS_API_KEY')
    # }
    # app.expose({ options: options}, 'bg')

    # routing after static…
    app.use app.router

  # logs
  app.configure 'production', ->
    app.use express.errorHandler()

  app.configure 'development', ->
    app.use express.errorHandler({ dumpExceptions: true, showStack: true })
    app.use express.logger()

  return app
