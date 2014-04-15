Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Services extends Controller
  trace: true
  logPrefix: '[SERVICES]'

  elements: {
    '.hw-sub-container' : 'servicePanels'
    '.hw-sub-close'     : 'closeButton'
  }

  events: {
    'tap .hw-sub-container' : 'open'
    'tap .hw-sub-close'     : 'close'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @e.on 'clean', => @clean()
    this

  clean: =>
    @servicePanels.removeClass options.activeClass
    this

  open: (e) ->
    @log 'Service open'
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(options.activeClass)
    e.preventDefault()
    @clean()
    @el.css('z-index', 2)
    $target.addClass(options.activeClass)
    @e.trigger 'open'
    this

  close: (e) ->
    @log 'Service close'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $panel = @servicePanels.eq( @closeButton.index($target) )
    return unless $panel.hasClass options.activeClass
    $panel.one('transitionend', =>
      @log 'Service close :: transition end'
      @el.css('z-index', 1)
      @e.trigger 'close'
      @clean()
    )
    $panel.heventRemoveClass(options.activeClass)
    this

module.exports = Services
