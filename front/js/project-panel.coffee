$           = require 'jquery'
Controller  = require './front-controller'
Carrousel   = require './projects-carrousel'
shared      = require '../../shared/stylus-var'
pubsub      = require './pubsub'

class Project extends Controller
  trace:      true
  logPrefix:  'PROJECT'

  elements: {
    '.hw-projects-cover'            : 'cover'
    '.hw-projects-content-container': 'container'
    '.hw-projects-content'          : 'content'
  }

  events: {
    'tap'                           : 'openEvent'
    'tap .hw-projects-close'        : 'closeEvent'
    'click .hw-projects-name'       : 'prevent'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @setup()
    @setupPanelInfo()
    @wait(1000).then @loadCover
    this

  ########
  #  UTILITY
  ########

  setup: ->
    @href       = @cover.find('a').attr('href')
    @body       = $()
    @carrousel  = $()
    pubsub('resizeEnd').subscribe @setupPanelInfo

  # Don't go on project page
  # Has to be a click event since tap & click event aren't the same
  # http://stackoverflow.com/questions/18225061/hammer-js-and-preventdefault
  prevent: (event) ->
    @log 'prevent'
    event.preventDefault()
    false

  setupPanelInfo: =>
    windowWidth = @window.width()

    if windowWidth < shared.mobileWidth
      @skew       = 0
      @color      = {r:255, g: 255, b:255}
      return

    modulo      = if windowWidth >= shared.desktopWidth then 3 else 2
    direction   = if @index % modulo is 1 then 1 else -1
    @skew       = 26.5 * direction
    @color      = if direction > 0 then '$gray' else '$white'

  ########
  #  COVER IMAGE
  ########

  loadCover: =>
    @log 'init load cover'

    $title = @cover.find('.hw-projects-name')
    imgMarkup = '<img src="' + $title.data('original') + '" alt="' + $title.data('alt') + '" />'

    $(imgMarkup)
      .appendTo(@cover)
      .imagesLoaded()
      .done => @cover.removeClass shared.projectCoverLoad

  ########
  #  OPEN
  ########

  openEvent: (e) ->
    @log 'open'
    # e.stopPropagation()
    return if @el.hasClass(shared.activeClass)
    e.preventDefault()
    @log 'Projects open'
    @el.addClass shared.activeClass
    pubsub('projects').publish('openStart')
    @runSequence ['openCover', 'openPanel', 'flipCover&&flipPanel', 'openEnd']
    this

  openCover: (dfd) ->
    @log dfd
    @el.css 'z-index', 2
    @cover.velocity
      properties:
        height: '150%'
        top: '-25%'
        skewY: [0, @skew]
        backgroundColor: '$dark-gray'
      options:
        complete: dfd.resolve

  openPanel: (dfd) ->
    @log 'open Panel'
    pubsub('projects').publish('openPanelStart')
    @container.css {right: 0, bottom: 0}
    dfd.resolve()

  flipCover: (dfd) ->
    @cover
      .velocity
        properties:
          rotateY: [180, 0]
        options:
          duration: 750
          complete: dfd.resolve

  flipPanel: (dfd) ->
    # Compute size so we can position the content panel starting position
    coverOffset       = @cover.offset()
    coverWidth        = @cover.width()
    coverHeight       = @cover.height()

    windowWidth       = @window.width()
    windowHeight      = @window.height()
    windowScrollTop   = @window.scrollTop()
    windowScrollLeft  = 0

    scaleX            = coverWidth / windowWidth
    scaleY            = coverHeight / windowHeight

    # Align transform center
    originLeft   = Math.round coverOffset.left - windowScrollLeft + coverWidth / 2
    originLeft   = Math.round ( originLeft / windowWidth ) * 100

    originTop    = Math.round coverOffset.top - windowScrollTop + coverHeight / 2
    originTop    = Math.round ( originTop / windowHeight ) * 100

    @log 'left', originLeft, 'top', originTop

    @container.css @prefix('perspectiveOrigin'), "#{originLeft}% #{originTop}%"
    # flip content panel
    @content
      .css @prefix('transformOrigin'), "#{originLeft}% #{originTop}% 0"
      .velocity
        properties:
          rotateY: [0, 180]
          # scaleX: [scaleX, scaleX]
          # scaleY: [scaleY, scaleY]
          scaleX: [1, scaleX]
          scaleY: [1, scaleY]
          # Translate to fix perspective origin
          translateX: ['0%', "#{originLeft - 50} %"]
        options:
          duration: 750
          complete: dfd.resolve
          queue: false

    # TODO 2 step animation
    # Have to remove 'reverse' animation…
    # @content.velocity
    #   properties:
    #     scaleX: [1, scaleX]
    #     scaleY: [1, scaleY]
    #   options:
    #     delay: 375
    #     duration: 375
    #     queue: false

  openEnd: (dfd) ->
    @log 'transition end ::','open'
    @content.css 'overflow', 'auto'
    @carrousel.css 'visibility', 'visible'
    @loadBody()
    @wait(50).then dfd.resolve
    pubsub('projects').publish('openEnd')

  loadBody: ->
    return if @body.length isnt 0
    @log 'load body', @href
    $.get(@href).success (body) =>
      @content.data('bodyLoaded', true)
      @body = $('<div class="hw-projects-content-xhr"></div>')
        .css('opacity', 0)
        .append(body)

      pubsub('projects').publish('loadContentEnd')

      @content.append(@body)

      @wait(100).then =>
        @body.css('opacity', 1)
        @initCarrousel()

  initCarrousel: ->
    @carrousel = @content
      .data('carrousel', true)
      .find('.hw-projects-gallery-container')

    @log 'init', @carrousel.length, 'carrousel(s)'

    $.each(@carrousel, ->
      new Carrousel({el: $(this)})
    )

  #########
  #  CLOSE
  #########

  closeEvent: (e) ->
    @log 'Projects close'
    e.preventDefault()
    e.stopImmediatePropagation()
    pubsub('projects').publish('closeStart')
    # Reset scroll to top
    # So the backface of the project appear on the animation
    @content.scrollTop(0).css('overflow', 'hidden')
    @carrousel.css 'visibility', 'hidden'
    @runSequence ['closePanel', 'closeCover', 'closeEnd']
    this

  closePanel: (dfd) ->
    @el.removeClass shared.activeClass
    @content.velocity 'reverse'
    @cover.velocity 'reverse', {
      complete: =>
        @container.css {right: '100%', bottom: '100%', overflow: 'hidden'}
        dfd.resolve()
    }

  closeCover: (dfd) ->
    @cover.velocity
      properties:
        height: '100%'
        top: '0%'
        skewY: [@skew, 0]
        backgroundColor: @color
      options:
        complete: dfd.resolve

  closeEnd: (dfd) ->
    @log 'close end'
    @el.css('z-index', 1)
    @content.removeAttr('style')
    @cover.removeAttr('style')
    @container.removeAttr('style')
    dfd.resolve()
    pubsub('projects').publish('closeEnd')

module.exports = Project
