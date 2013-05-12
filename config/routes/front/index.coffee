front = require('../../../controllers').front

log = '[ROUTES][FRONT]'

module.exports = (app) ->
  console.log log.prompt, 'setup'
  app.get '/', front.home
