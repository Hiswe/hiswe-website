fs        = require 'fs'
nodePath  = require 'path'

log = '[ROUTES]'

module.exports = (app) ->
  # Front
  console.log log.prompt, 'setup front'

  buildRoutes(app)

  # 404 Page
  app.use (req, res, next) ->
    res.status(404).render('404', { url: req.originalUrl })


buildRoutes = (app) ->
  files = walk nodePath.join(__dirname, '../controllers')
  console.log log.prompt, 'build routes'
  files.forEach (file) ->
    module = require file
    name = if module.name? then module.name else nodePath.basename(file, '.coffee')
    prefix = if module.prefix? then module.prefix else ''

    console.log "#{log} building route for".debug, name, 'with prefix'.debug, prefix

    for key, value of module
      continue if (~['name', 'prefix', 'engine', 'before'].indexOf(key))
      switch key
        when 'show'
          method = 'get'
          path = "/#{name}/:#{name}_id"
        when 'list'
          method = 'get'
          path = "/#{name}s"
        when 'edit'
          method = 'get'
          path = "/#{name}/:#{name}_id/edit"
        when 'update'
          method = 'put'
          path = "/#{name}/:#{name}_id"
        when 'create'
          method = 'post'
          path = "/#{name}"
        when 'index'
          method = 'get'
          path = "/#{name}"
        else
          throw new Error("unrecognized route: #{name}.#{key}")

      path = prefix + path
      console.log "#{log} create method".prompt, method.toUpperCase(), 'of route'.prompt, path
      app[method](path, value)

walk = (path) ->
  result = []
  fs.readdirSync(path).forEach (name) ->
    actualPath = nodePath.join path, name
    if fs.statSync(actualPath).isDirectory()
      result = result.concat walk(actualPath)
    else
      return unless name.match(/\.(coffee|js)$/)
      result.push actualPath

  result
