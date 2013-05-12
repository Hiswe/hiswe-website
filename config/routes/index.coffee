log = '[ROUTES]'

module.exports = (app) ->
  # Front
  console.log log.prompt, 'setup front'
  require('./front')(app)

  # 404 Page
  app.use (req, res, next) ->
    res.status(404).render('404', { url: req.originalUrl });
