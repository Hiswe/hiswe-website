Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Projects extends Controller
  trace: true
  logPrefix: '[PROJECTS]'

  elements: {
    '.hw-projects-item'             : 'all'
    '.hw-projects-content-container': 'content'
  }

  events: {
    'tap .hw-projects-item'             : 'open'
    'tap .hw-projects-content-container': 'close'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @e.on 'clean', => @clean()
    this

  clean: ->
    @all.removeClass options.activeClass
    this

  open: (e) ->
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(options.activeClass)
    @log 'Projects open'
    e.preventDefault()
    window.clearTimeout @timer
    @clean()
    @el.css('z-index', 2)
    $target.addClass options.activeClass
    @e.trigger 'open'
    this

  close: (e) ->
    @log 'Projects close'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $panel = @all.eq( @content.index($target) )
    $panel.one('transitionend', =>
        @log 'Projects close :: transitionend'
        @el.css('z-index', 1)
        @e.trigger 'close'
      )
    $panel.heventRemoveClass(options.activeClass)
    this

module.exports = Projects