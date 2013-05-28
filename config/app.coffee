# Load dependencies
express       = require 'express'
configApp     = require './config-app'
routes        = require './routes'

#
# Exports
#
module.exports = ->
  log = "[BOOT]"
  # Create Server
  app = express()

  # Load Expressjs config
  console.log log.debug, 'Setup application'
  configApp(app)

  # Load routes config
  console.log log.debug, 'Setup routes'
  routes(app)

  return app
