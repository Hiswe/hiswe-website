fs        = require 'fs'
nodePath  = require 'path'

log       = '[ROUTES]'

controller = (name) -> require("./controllers/#{name}")

module.exports = (app) ->
  console.log log.debug, 'setup front'

  app.resource 'contact',   controller('contact')
  app.resource 'projects',  controller('project')

  app.resource controller('home')

  # 404 Page
  app.use (req, res, next) ->
    res.status(404).render('404', { url: req.originalUrl })
