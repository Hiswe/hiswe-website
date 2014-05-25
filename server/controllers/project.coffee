log   = '[PROJECT]'
db    = require('../datas/db-projects.json')
dbXhr = require('../datas/db-projects-xhr.json')
conf  = require('rc')('hiswe')

show = (req, res, next) ->
  console.log log.prompt, req.params.project
  return showXhr(req, res, next) if req.xhr

  if db[req.params.project]?
    return res.render('projects', {project: db[req.params.project]})

  console.warn log.error, req.params.project, "don't exist"
  next()

showXhr = (req, res, next) ->
  if dbXhr[req.params.project]?
    if conf.NODE_ENV is 'development'
      return setTimeout( ->
        res.send(dbXhr[req.params.project])
      , 750 + Math.round(750 * Math.random()))
    return res.send(dbXhr[req.params.project])
  return res.send 404

exports.show = show
