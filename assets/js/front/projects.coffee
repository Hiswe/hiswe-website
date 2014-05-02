Controller  = require './front-controller.coffee'
Carrousel   = require './projects-carrousel.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Projects extends Controller
  trace:      false
  logPrefix:  '[PROJECTS]'
  opened:     false

  elements: {
    '.hw-projects-item'             : 'all'
    '.hw-projects-content-container': 'content'
    '.hw-projects-content'          : 'container'
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
    @loadCovers()
    this

  currentPanel: ->
    return @all.filter(".#{options.activeClass}")

  clean: ->
    @currentPanel().heventRemoveClass(options.activeClass)
    this

  loadCovers: ->
    @wait(1000).then =>
      @log 'init load cover'
      @$(".#{options.projectCoverLoad}")
        .each( ->
          $cover = $(this)
          $title = $cover.find('span')
          imgMarkup = '<img src="' + $title.data('original') + '" alt="' + $title.data('alt') + '" />'

          $(imgMarkup)
            .appendTo($cover)
            .imagesLoaded()
            .done( ->
              $cover.removeClass(options.projectCoverLoad)
            )
        )

  transitionend: (event) ->
    e = event.originalEvent
    @log 'transitionend', e.type
    return unless event.originalEvent?

    # No support of transitionend
    if e.type is 'hevent'
      if @opened is on
        @closeTransitionEnd()
      else
        @openTransitionEnd()
      return

    propertyName = e.propertyName
    return unless /^top|opacity$/.test propertyName
    return unless /content|cover/.test event.target.className
    # the last transition of closing
    if @opened is on and propertyName is 'top'
      @closeTransitionEnd()
    # the last transition of opening
    else if @opened is off and propertyName is 'opacity'
      @openTransitionEnd()

    this

  openTransitionEnd: ->
    return this if @opened is on
    @log 'transition end ::','open'
    $currentPanel = @currentPanel()
    @initCarrousel($currentPanel) unless $currentPanel.data('carrousel')
    @opened = on

  closeTransitionEnd: ->
    return this if @opened is off
    @log 'transition end::', 'close'
    @el.css('z-index', 1)
    @e.trigger 'close'
    @opened = off

  initCarrousel: ($currentPanel) ->
    $carrousel = $currentPanel
      .data('carrousel', true)
      .find('.hw-projects-gallery-container')

    @log 'init', $carrousel.length, 'carrousel(s)'

    $.each($carrousel, ->
      new Carrousel({el: $(this)})
    )

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
    # Reset scroll to top
    # So the backface of the project appear on the animation
    @container.scrollTop(0)
    @clean()
    this

module.exports = Projects