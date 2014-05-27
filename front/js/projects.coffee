$                 = require 'jquery'
Controller        = require './front-controller'
pubsub            = require './pubsub'
ProjectController = require './project-panel'

class Projects extends Controller
  trace:      false
  logPrefix:  'PROJECTS LIST'

  elements: {
    '.hw-projects-item' : 'all'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'

    $window = $(window)

    @all.each (index) -> new ProjectController {
      el: $(this)
      index: index
      window: $window
    }

    this

module.exports = Projects
