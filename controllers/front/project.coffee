log           = '[PROJECT]'
db            = require('../../config/datas/db-projects.json')

show = (req, res, next) ->
  console.log log.prompt, req.params.project
  if db[req.params.project]?
    return res.render('front/projects', {project: db[req.params.project]})

  console.warn log.error, req.params.project, "don't exist"
  next()


exports.show = show
