Controller  = require './front-controller.coffee'
Carrousel   = require './projects-carrousel.coffee'
options     = require '../../../config/datas/stylus-var.json'

class Projects extends Controller
  trace:      false
  logPrefix:  'PROJECTS'
  opened:     false

  elements: {
    '.hw-projects-item'             : 'all'
    '.hw-projects-content-container': 'content'
    '.hw-projects-content'          : 'container'
  }

  events: {
    'tap .hw-projects-item'         : 'open'
    'tap .hw-projects-name'         : 'prevent'
    'tap .hw-projects-close'        : 'close'
    'transitionend .hw-witness'     : 'witness'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @all.append('<dd class="' + options.witness + '"></dd>')
    @loadCovers()
    this

  # Don't go on project page
  prevent: (event) ->
    @log 'prevent', event
    event.preventDefault()
    false

  currentPanel: ->
    return @all.filter(".#{options.activeClass}")

  clean: ->
    @currentPanel()
      .removeClass(options.activeClass)
      .find(".#{options.witness}")
      .heventRemoveClass(options.activeWitness)
    this

  # Cover images
  loadCovers: ->
    @wait(1000).then =>
      @log 'init load cover'
      @$(".#{options.projectCoverLoad}")
        .each( ->
          $cover = $(this)
          $title = $cover.find('.hw-projects-name')
          imgMarkup = '<img src="' + $title.data('original') + '" alt="' + $title.data('alt') + '" />'

          $(imgMarkup)
            .appendTo($cover)
            .imagesLoaded()
            .done( ->
              $cover.removeClass(options.projectCoverLoad)
            )
        )

  loadBody: ($currentPanel) ->
    return if $currentPanel.data('bodyLoaded')
    @wait(100).then =>
      href = $currentPanel.find('a.hw-projects-name').attr('href')
      @log 'load body', href
      $.get(href).success (body) =>
        $currentPanel.data('bodyLoaded', true)
        $body = $('<div class="hw-projects-content-xhr"></div>')
          .css('opacity', 0)
          .append(body)

        $currentPanel.find('.hw-projects-content').append($body)

        @wait(100).then =>
          $body.css('opacity', 1)
          @initCarrousel($currentPanel)

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
    @loadBody($currentPanel)
    @e.trigger 'openEnd'
    @opened = on

  closingTransitionEnd: ->
    return this if @opened is off
    @log 'transition end::', 'close'
    @el.css('z-index', 1)
    @e.trigger 'closeEnd'
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
    # wait for firefox…
    @wait(50).then -> $target.addClass(options.activeClass)

    $target.find(".#{options.witness}")
      .heventAddClass(options.activeWitness)
    @e.trigger 'openStart'
    this

  close: (e) ->
    @log 'Projects close'
    e.preventDefault()
    e.stopImmediatePropagation()
    @e.trigger 'closeStart'
    # Reset scroll to top
    # So the backface of the project appear on the animation
    @container.scrollTop(0)
    @clean()
    this

module.exports = Projects