Controller  = require './front-controller.coffee'

class ServicesCarrousel extends Controller
  trace: true
  logPrefix: '[CARROUSEL]'

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    this

module.exports = ServicesCarrousel
