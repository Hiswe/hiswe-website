Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Home extends Controller
  trace: true
  logPrefix: '[HOME]'
  activeClass: options.activeClass
  activeBody:  options.activeBody
  carrouselClass: options.carrouselClass
  timer: undefined

  elements: {
    '.hw-sub-container'                   : 'servicePanels'
    'section.hw-services, section.hw-work': 'containers'
    '.hw-sub-close'                       : 'close'
    '.hw-work-carrousel ul'               : 'carrousel'
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
    @servicePanels.removeClass @activeClass
    this

  serviceZoom: (e) ->
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(@activeClass)
    window.clearTimeout @timer
    @log 'Service zoom'
    e.preventDefault()
    e.stopPropagation()
    $papa = $target.closest('section')
    @cleanAll()
    @containers.not($papa).css('z-index', 1)
    $papa.css('z-index', 2)
    $target.addClass(@activeClass)
    @body.addClass(@activeBody)
    this

  serviceClose: (e) ->
    @log 'Service close'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $panel = @servicePanels.eq( @close.index($target) )
    return unless $panel.hasClass @activeClass
    $papa = $panel.closest('section')
    @timer = @delay ->
        $papa.css('z-index', 1)
      , 2000
    $panel.removeClass(@activeClass)
    @body.removeClass @activeBody
    @cleanAll()
    this

module.exports = Home
