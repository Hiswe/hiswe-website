$           = require 'jquery'
Controller  = require './front-controller'
Carrousel   = require './projects-carrousel'
options     = require '../../shared/stylus-var'
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
    @wait(1000).then @loadCover
    this

  setup: ->
    @direction  = if @index % 3 is 1 then 1 else -1
    @skew       = 26.5 * @direction
    @color      = if @direction > 0 then options['$gray'] else {r:255, g: 255, b:255}
    @href       = @cover.find('a').attr('href')
    @body       = $()
    @carrousel  = $()

  # Don't go on project page
  # Has to be a click event since tap & click event aren't the same
  # http://stackoverflow.com/questions/18225061/hammer-js-and-preventdefault
  prevent: (event) ->
    @log 'prevent'
    event.preventDefault()
    false

  prefix: (propertie) ->
    str = Modernizr.prefixed propertie
    str.replace(/([A-Z])/g, (str,m1) -> '-' + m1.toLowerCase() )
      .replace(/^ms-/,'-ms-')

  ########
  #  COVER IMAGE
  ########

  loadCover: =>
    @wait(1000).then =>
      @log 'init load cover'

      $title = @cover.find('.hw-projects-name')
      imgMarkup = '<img src="' + $title.data('original') + '" alt="' + $title.data('alt') + '" />'

      $(imgMarkup)
        .appendTo(@cover)
        .imagesLoaded()
        .done => @cover.removeClass options.projectCoverLoad

  ########
  #  OPEN
  ########

  openEvent: (e) ->
    @log 'open'
    # e.stopPropagation()
    return if @el.hasClass(options.activeClass)
    e.preventDefault()
    @log 'Projects open'
    @el.addClass options.activeClass
    pubsub('projects').publish('openStart')
    @openCover().done @openPanel
    this

  openCover: =>
    @log 'open Cover'
    @el.css 'z-index', 2
    @cover
      .velocity
        properties:
          height: '150%'
          top: '-25%'
          skewY: [0, @skew]
          backgroundColorRed:   options['$dark-gray'].r
          backgroundColorGreen: options['$dark-gray'].g
          backgroundColorBlue:  options['$dark-gray'].b
        options:
          ease: 'ease'
          duration: 500

  openPanel: (cover) =>
    @log 'open Panel'
    pubsub('projects').publish('openPanelStart')
    # coverOffset       = @cover.offset()
    # coverWidth        = @cover.width()
    # coverHeight       = @cover.height()

    # windowWidth       = @window.width()
    # windowHeight      = @window.height()
    # windowScrollTop   = @window.scrollTop()
    # windowScrollLeft  = 0

    # scaleX            = coverWidth / windowWidth
    # scaleY            = coverHeight / windowHeight


    # perspectiveLeft   = coverOffset.left - windowScrollLeft + coverWidth / 2
    # perspectiveLeft   = Math.round ( perspectiveLeft / windowWidth ) * 100


    # perspectiveTop    = coverOffset.top - windowScrollTop + coverHeight / 2
    # perspectiveTop    = Math.round ( perspectiveTop / windowHeight ) * 100


    # pouic = $('<span />').css({
    #   width: '4px', height: '4px', margin: '-2px 0 0 -2px', position: 'fixed', 'z-index': 9999, background: 'red', display: 'block'
    #   left: perspectiveLeft + '%', top: perspectiveTop + '%'
    # }).appendTo($('body'))
    # @log pouic
    # return
    @flipCover()
    @container.css {right: 0, bottom: 0}
    @flipPanel().done @openEnd

  flipCover: ->
    @cover
      .velocity
        properties:
          rotateY: [180, 0]
        options:
          ease: 'ease'
          duration: 750

  flipPanel: ->
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
    perspectiveLeft   = coverOffset.left - windowScrollLeft + coverWidth / 2
    perspectiveLeft   = Math.round ( perspectiveLeft / windowWidth ) * 100
    # perspectiveLeft   = Math.round perspectiveLeft + perspectiveLeft * scaleX

    perspectiveTop    = coverOffset.top - windowScrollTop + coverHeight / 2
    perspectiveTop    = Math.round ( perspectiveTop / windowHeight ) * 100
    # perspectiveTop    = Math.round perspectiveTop + perspectiveTop * scaleY

    @log 'left', perspectiveLeft, 'top', perspectiveTop
    # @container.css @prefix('perspectiveOrigin'), "#{perspectiveLeft}% #{perspectiveTop}%"

    # flip content panel
    @content
      .css @prefix('transformOrigin'), "#{perspectiveLeft}% #{perspectiveTop}%"
      .velocity
        properties:
          # top: [0, coverOffset.top - windowScrollTop]
          # left: [0, coverOffset.left - windowScrollLeft]
          rotateY: [0, 180]
          scaleX: [scaleX, scaleX]
          scaleY: [scaleY, scaleY]
        options:
          ease: 'ease'
          duration: 750

  openEnd: =>
    @log 'transition end ::','open'
    @content.css 'overflow', 'auto'
    @carrousel.css 'visibility', 'visible'
    @loadBody()
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
    @closePanel()
    this

  closePanel: ->
    @el.removeClass options.activeClass
    @content.velocity 'reverse'
    @cover.velocity('reverse').done =>
      @container.css {right: '100%', bottom: '100%', overflow: 'hidden'}
      @closeCover()

  closeCover: ->
    @cover.velocity
      properties:
        height: '100%'
        top: '0%'
        skewY: [@skew, 0]
        backgroundColorRed:   @color.r
        backgroundColorGreen: @color.g
        backgroundColorBlue:  @color.b
    .done @closeEnd

  closeEnd: =>
    @log 'close end'
    @el.css('z-index', 1)
    pubsub('projects').publish('closeEnd')

module.exports = Project
