$           = require('./setup')()
Controller  = require './front-controller'
options     = require '../../shared/stylus-var'
pubsub      = require './pubsub'

class Services extends Controller
  trace: false
  logPrefix: 'SERVICES'
  opened: false

  elements: {
    '.hw-services-item' : 'servicePanels'
    '.hw-sub-close'     : 'closeButton'
  }

  events: {
    'tap .hw-services-item' : 'open'
    'tap .hw-sub-close'     : 'close'
    'transitionend .hw-services-item': 'transitionend'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    pubsub('body').subscribe (event) =>
      @clean() if event is 'tap'
    this

  clean: =>
    @log 'clean'
    $panel  = @servicePanels.filter(".#{options.activeClass}")
    $panel.heventRemoveClass(options.activeClass)
    this

  transitionend: (event) ->
    e = event.originalEvent
    return unless event.originalEvent?
    return unless /cover/.test event.target.className
    return unless /transform/.test e.propertyName
    if @opened is on
      @log 'transition end::', 'close'
      @el.css('z-index', 1)
      pubsub('services').publish('close')
      @opened = false
    else
      @log 'transition end ::','open'
      @opened = true

  open: (e) ->
    @log 'Service open'
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(options.activeClass)
    e.preventDefault()
    @clean()
    @el.css('z-index', 2)
    $target.heventAddClass(options.activeClass)
    pubsub('services').publish('open')
    this

  close: (e) ->
    @log 'Service close'
    e.preventDefault()
    e.stopImmediatePropagation()
    @clean()
    this

module.exports = Services
