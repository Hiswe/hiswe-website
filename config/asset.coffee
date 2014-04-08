express   = require 'express'
path      = require 'path'

stylusVar = require './datas/stylus-var.json'

module.exports = (app) ->
  # Slow assets on dev
  if app.get('env') is 'development'
    app.use (req, res, next) ->
      if /\.(jpg||jpeg||png||svg)$/i.test req.url
        setTimeout(next, 250 + Math.round(1000 * Math.random()))
      else
        next()

  # Statics
  if app.get('env') is 'production'
    maxAge = 2629800000 # 1 month
  else
    maxAge = 0

  assets    = path.join(__dirname, '/../public')
  app.use express.static(assets, {maxAge: maxAge})

  return app
