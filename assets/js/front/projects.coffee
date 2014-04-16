Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Projects extends Controller
  trace: true
  logPrefix: '[PROJECTS]'
  opened: false

  elements: {
    '.hw-projects-item'             : 'all'
    '.hw-projects-content-container': 'content'
  }

  events: {
    'tap .hw-projects-item'             : 'open'
    'tap .hw-projects-content-container': 'close'
    'transitionend .hw-projects-item'   : 'transitionend'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    this

  clean: ->
    @all
      .filter(".#{options.activeClass}")
      .heventRemoveClass(options.activeClass)
    this

  transitionend: (event) ->
    e = event.originalEvent
    return unless event.originalEvent?
    return unless /^top$/.test e.propertyName
    if @opened is on
      @log 'transition end::', 'close'
      @el.css('z-index', 1)
      @e.trigger 'close'
      @opened = false
    else
      @log 'transition end ::','open'
      @opened = true

  open: (e) ->
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(options.activeClass)
    @log 'Projects open'
    e.preventDefault()
    @clean()
    @el.css('z-index', 2)
    $target.heventAddClass options.activeClass
    @e.trigger 'open'
    this

  close: (e) ->
    @log 'Projects close'
    e.preventDefault()
    e.stopImmediatePropagation()
    @clean()
    this

module.exports = Projects