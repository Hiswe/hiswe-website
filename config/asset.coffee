express = require 'express'
expose  = require 'express-expose'
path    = require 'path'
stylus  = require 'stylus'
nib     = require 'nib'
hstrap  = require 'hstrap'

activeClass     = 'hw-panel-active'
activeBody      = 'hw-body-active'
carrouselClass  = 'hw-carrousel'

module.exports = (app) ->
  # Coffeescript + sprocket
  app.use require('connect-assets')()

  # Statics
  if app.get('env') is 'production'
    maxAge = 2629800000 # 1 month
  else
    maxAge = 0
  assets    = path.join(__dirname, '/../public')
  app.use express.static(assets, {maxAge: maxAge})

  # expose some datas to the front app under hw namespace
  options = {
    activeClass:    activeClass
    carrouselClass: carrouselClass
    activeBody:     activeBody
  }
  app.expose({ options: options}, 'hw')

  return app
