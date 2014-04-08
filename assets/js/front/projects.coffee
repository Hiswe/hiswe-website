Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Projects extends Controller
  trace: true
  logPrefix: '[PROJECTS]'

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @body = $('body')
    @body.on 'click', @cleanAll
    this

module.exports = Projects