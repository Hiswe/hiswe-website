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
    # Cache window as we will access it's size later
    @window     = $(window)
    @direction  = if @index % 3 is 1 then 1 else -1
    @skew       = 26.5 * @direction
    @color      = if @direction > 0 then options['$gray'] else {r:255, g: 255, b:255}

  # Don't go on project page
  # Has to be a click event since tap & click event aren't the same
  # http://stackoverflow.com/questions/18225061/hammer-js-and-preventdefault
  prevent: (event) ->
    @log 'prevent'
    event.preventDefault()
    false

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
    @cover
      .css 'z-index', 2
      .velocity
        properties:
          height: '150%'
          top: '-25%'
          skewY: [0, @direction * 26.5]
          backgroundColorRed:   options['$dark-gray'].r
          backgroundColorGreen: options['$dark-gray'].g
          backgroundColorBlue:  options['$dark-gray'].b
        options:
          ease: 'ease'
          duration: 750

  openPanel: (cover) =>
    @log 'open Panel'
    pubsub('projects').publish('openPanelStart')
    @flipCover()
    @container.css {right: 0, bottom: 0, overflow: 'auto'}
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
    coverOffset   = @cover.offset()
    coverWidth    = @cover.width()
    coverHeight   = @cover.height()

    windowWidth   = @window.width()
    windowHeight  = @window.height()

    # flip content panel
    @content.velocity
      properties:
        top: [0, coverOffset.top - @window.scrollTop()]
        left: [0, coverOffset.left - @window.scrollLeft()]
        rotateY: [0, 180]
        scaleX: [1, coverWidth / windowWidth]
        scaleY: [1, coverHeight / windowHeight]
      options:
        ease: 'ease'
        duration: 750

  openEnd: =>
    return this if @opened is on
    @log 'transition end ::','open'
    @content.css 'overflow', 'auto'
    @loadBody()
    pubsub('projects').publish('openEnd')
    @opened = on

  loadBody: ->
    return if @content.data 'bodyLoaded'
    href = @content.data 'xhr'
    @log 'load body', href
    $.get(href).success (body) =>
      @content.data('bodyLoaded', true)
      $body = $('<div class="hw-projects-content-xhr"></div>')
        .css('opacity', 0)
        .append(body)

      pubsub('projects').publish('loadContentEnd')

      @content.append($body)

      @wait(100).then =>
        $body.css('opacity', 1)
        @initCarrousel()

  initCarrousel: ->
    $carrousel = @content
      .data('carrousel', true)
      .find('.hw-projects-gallery-container')

    @log 'init', $carrousel.length, 'carrousel(s)'

    $.each($carrousel, ->
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
    @content.css 'overflow', 'hidden'
    @container.scrollTop(0)
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
        skewY: [@direction * 26.5, 0]
        backgroundColorRed:   @color.r
        backgroundColorGreen: @color.g
        backgroundColorBlue:  @color.b
    .done @closeEnd

  closeEnd: =>
    @log 'close end'
    @el.css('z-index', 1)
    pubsub('projects').publish('closeEnd')

module.exports = Project
