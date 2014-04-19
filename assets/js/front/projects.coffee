Controller  = require './front-controller.coffee'
Carrousel   = require './projects-carrousel.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Projects extends Controller
  trace: true
  logPrefix: '[PROJECTS]'
  opened: false

  elements: {
    '.hw-projects-item'             : 'all'
    '.hw-projects-content-container': 'content'
    '.hw-projects-content'          : 'container'
    '.hw-projects-gallery-container': 'carrouselList'
  }

  events: {
    'tap .hw-projects-item'             : 'open'
    'tap .hw-projects-close'            : 'close'
    'transitionend .hw-projects-item'   : 'transitionend'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    this

  currentPanel: ->
    return @all.filter(".#{options.activeClass}")

  clean: ->
    @currentPanel().heventRemoveClass(options.activeClass)
    this

  transitionend: (event) ->
    e = event.originalEvent
    return unless event.originalEvent?
    propertyName = e.propertyName
    return unless /^top|opacity$/.test propertyName
    return unless /content|cover/.test event.target.className
    # the last transition of closing
    if @opened is on and propertyName is 'top'
      @log 'transition end::', 'close'
      @el.css('z-index', 1)
      @e.trigger 'close'
      @opened = off
    # the last transition of opening
    else if @opened is off and propertyName is 'opacity'
      @log 'transition end ::','open'
      $currentPanel = @currentPanel()

      # init carrousel
      unless $currentPanel.data('carrousel')
        $currentPanel.data('carrousel', true)
        $.each(@carrouselList, ->
          new Carrousel({el: $(this)})
        )

      @opened = on
    this

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
    # Force scroll to top
    # So the backface of the project appear on the animation
    @container.scrollTop(0)
    @clean()
    this

module.exports = Projects