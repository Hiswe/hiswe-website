express = require 'express'
expose  = require 'express-expose'
path    = require 'path'
stylus  = require 'stylus'
nib     = require 'nib'
hstrap  = require 'hstrap'

activeClass     = 'hw-panel-active'
activeBody      = 'hw-body-active'
carrouselClass  = 'hw-carrousel'

compileCss = (app) ->
  if app.get('env') is 'development'
    isDev = stylus.nodes.true
  else
    isDev = stylus.nodes.false

  return (str, path) ->
    return stylus(str)
     .set('filename', path)
     .set('compress', false)
     .set('linenos', false)
     .set('firebug', false)
     .define('activeClass', new stylus.nodes.String(activeClass))
     .define('carrouselClass', new stylus.nodes.String(carrouselClass))
     .define('activeBody', new stylus.nodes.String(activeBody))
     .define('isDev', isDev)
     .use(nib())
     .use(hstrap())

module.exports = (app) ->
  # Coffeescript + sprocket
  app.use require('connect-assets')()

  # Stylus
  app.use stylus.middleware({
    src: path.join( __dirname + '/../assets/css')
    dest: path.join( __dirname + '/../tmp/css')
    compile: compileCss(app)
  });

  # Statics
  if app.get('env') is 'production'
    maxAge = 2629800000 # 1 month
  else
    maxAge = 1
  assets    = path.join(__dirname, '/../public')
  tmpAssets = path.join(__dirname, '/../tmp/css')
  app.use express.static(assets, {maxAge: maxAge})
  app.use express.static(tmpAssets, {maxAge: maxAge})

  # expose some datas to the front app under hw namespace
  options = {
    activeClass:    activeClass
    carrouselClass: carrouselClass
    activeBody:     activeBody
  }
  app.expose({ options: options}, 'hw')

  return app
