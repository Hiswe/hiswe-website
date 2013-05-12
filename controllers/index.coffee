fs    = require 'fs'

log  = '[CONTROLLERS]'

console.log log.prompt, 'Build controller list'

walk = (path) ->
  result = {}
  fs.readdirSync(path).forEach (name) ->
    actualPath = "#{path}/#{name}"
    return if actualPath is __filename
    if fs.statSync(actualPath).isDirectory()
      result[name] = walk(actualPath)
    else
      return unless name.match(/\.(coffee|js)$/)
      result[removeExtension(name)] = require actualPath
  result

removeExtension = (name) ->
  name.replace(/\.\w*$/g, '')

module.exports = walk(__dirname)
