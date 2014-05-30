$                 = require 'jquery'
Controller        = require './front-controller'
pubsub            = require './pubsub'
ProjectController = require './project-panel'

class Projects extends Controller
  trace:      false
  logPrefix:  'PROJECTS LIST'
  list: []

  elements: {
    '.hw-projects-item' : 'all'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'

    # Cache window as we will access it's size later
    $window = $(window)

    @all.each (index, element) =>
      project = new ProjectController {
        el: $(element)
        index: index
        window: $window
      }
      @list.push project

    this

module.exports = Projects
