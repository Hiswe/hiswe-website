Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Services extends Controller
  trace: false
  logPrefix: '[SERVICES]'
  timer: undefined

  elements: {
    '.hw-sub-container' : 'servicePanels'
    '.hw-sub-close'     : 'close'
  }

  events: {
    'click .hw-sub-container' : 'serviceZoom'
    'click .hw-sub-close'     : 'serviceClose'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @body = $('body')
    @body.on 'click', @cleanAll
    this

  cleanAll: (e) =>
    @log 'clean' if e?
    @servicePanels.removeClass options.activeClass
    this

  serviceZoom: (e) ->
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(options.activeClass)
    window.clearTimeout @timer
    @log 'Service zoom'
    e.preventDefault()
    e.stopPropagation()
    @cleanAll()
    @el.css('z-index', 2)
    $target.addClass(options.activeClass)
    @body.addClass(options.activeBody)
    this

  serviceClose: (e) ->
    @log 'Service close'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $panel = @servicePanels.eq( @close.index($target) )
    return unless $panel.hasClass options.activeClass
    # TODO should be made with transitionend
    @timer = @delay ->
        @el.css('z-index', 1)
      , 2000
    $panel.removeClass(options.activeClass)
    @body.removeClass options.activeBody
    @cleanAll()
    this

module.exports = Services
