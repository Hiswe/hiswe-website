$                 = require 'jquery'
pubsub            = require './pubsub'
Controller        = require './front-controller'
ServiceController = require './service-panel'

class Services extends Controller
  trace: false
  logPrefix: 'SERVICES LIST'
  opened: false
  list: []

  elements: {
    '.hw-services-item' : 'all'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'

    @all.each (index, element) =>
      project = new ServiceController {
        el: $(element)
        index: index
      }
      @list.push project

    pubsub('services').subscribe (event) =>
      return @el.css('z-index', 1) if event is 'close'
      return @el.css('z-index', 2) if event is 'open'

    this

module.exports = Services
