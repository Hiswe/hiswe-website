log   = '[PROJECT]'
db    = require('../../config/datas/db-projects.json')
dbXhr = require('../../config/datas/db-projects-xhr.json')

show = (req, res, next) ->
  console.log log.prompt, req.params.project
  return showXhr(req, res, next) if req.xhr

  if db[req.params.project]?
    return res.render('front/projects', {project: db[req.params.project]})

  console.warn log.error, req.params.project, "don't exist"
  next()

showXhr = (req, res, next) ->
  if dbXhr[req.params.project]?
    return res.send(dbXhr[req.params.project])
  return res.send 404

exports.show = show
