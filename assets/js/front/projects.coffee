Controller  = require './front-controller.coffee'
Carrousel   = require './projects-carrousel.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Projects extends Controller
  trace:      true
  logPrefix:  'PROJECTS'
  opened:     false

  elements: {
    '.hw-projects-item'             : 'all'
    '.hw-projects-content-container': 'content'
    '.hw-projects-content'          : 'container'
  }

  events: {
    'tap .hw-projects-item'             : 'open'
    'tap .hw-projects-close'            : 'close'
    'transitionend .hw-witness'         : 'witness'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @all.append('<dd class="' + options.witness + '"></dd>')
    @loadCovers()
    this

  currentPanel: ->
    return @all.filter(".#{options.activeClass}")

  clean: ->
    @currentPanel()
      .removeClass(options.activeClass)
      .find(".#{options.witness}")
      .heventRemoveClass(options.activeWitness)
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

  # The witness object is a dirty hack
  # But it keeps me from filtering between all transitionend events
  # that are bubbling everywhere :)
  witness: (event) ->
    if @opened is on
      @log 'witness :: close'
      @closingTransitionEnd()
    else
      @log 'witness :: open'
      @openingTransitionEnd()
    this

  openingTransitionEnd: ->
    return this if @opened is on
    @log 'transition end ::','open'
    $currentPanel = @currentPanel()
    @initCarrousel($currentPanel) unless $currentPanel.data('carrousel')
    @opened = on

  closingTransitionEnd: ->
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

    $target
      .addClass(options.activeClass)
      .find(".#{options.witness}")
      .heventAddClass(options.activeWitness)
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