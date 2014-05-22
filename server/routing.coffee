nodePath  = require 'path'

log       = '[ROUTES]'

controller = (name) -> require("./controllers/#{name}")

module.exports = (app) ->
  console.log log.debug, 'setup front'
  app.get   '/contact', controller('contact').index
  app.post  '/contact', controller('contact').create
  app.get   '/projects/:project',  controller('project').show
  app.get   '/', controller('home').index

  # 404 Page
  app.use (req, res, next) ->
    res.status(404).render('404', { url: req.originalUrl })
