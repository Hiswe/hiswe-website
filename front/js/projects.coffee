$           = require 'jquery'
Controller  = require './front-controller'
Carrousel   = require './projects-carrousel'
options     = require '../../shared/stylus-var'
pubsub      = require './pubsub'

class Projects extends Controller
  trace:      true
  logPrefix:  'PROJECTS'
  opened:     false

  elements: {
    '.hw-projects-item'             : 'all'
    '.hw-projects-close'            : 'allCover'
    '.hw-projects-content-container': 'content'
    '.hw-projects-content'          : 'container'
  }

  events: {
    'tap .hw-projects-item'         : 'open'
    'click .hw-projects-name'       : 'prevent'
    'tap .hw-projects-close'        : 'close'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @loadCovers()
    this

  # Don't go on project page
  # Has to be a click event since tap & click event aren't the same
  # http://stackoverflow.com/questions/18225061/hammer-js-and-preventdefault
  prevent: (event) ->
    @log 'prevent'
    event.preventDefault()
    false

  currentPanel: ->
    return @all.filter(".#{options.activeClass}")

  clean: ->
    @log 'clean'
    $panel = @currentPanel()
    return this unless $panel.length
    $panel
      .removeClass options.activeClass
      .find '.hw-projects-content'
      .velocity 'reverse'
      .done (el) =>
        $panel
        .find('.hw-projects-cover')
        .velocity 'reverse'
        .done (el) =>
          @log 'clean', el
          $(el).velocity
            properties:
              height: '100%'
              top: '0'
              # skewY: [0, direction * 26.5]
              backgroundColorRed:   options['$gray'].r
              backgroundColorGreen: options['$gray'].g
              backgroundColorBlue:  options['$gray'].b

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
      @log $currentPanel
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

  openingTransitionEnd: ->
    return this if @opened is on
    @log 'transition end ::','open'
    $currentPanel = @currentPanel()
    @loadBody($currentPanel)
    pubsub('projects').publish('openEnd')
    @opened = on

  closingTransitionEnd: ->
    return this if @opened is off
    @log 'transition end::', 'close'
    @el.css('z-index', 1)
    pubsub('projects').publish('closeEnd')
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
    @log 'open'
    $target = $(e.currentTarget)
    e.stopPropagation()
    # e.gesture.stopPropagation()
    return if $target.hasClass(options.activeClass)
    @log 'Projects open'
    e.preventDefault()
    # e.gesture.preventDefault()
    @clean()
    # @el.css('z-index', 2)
    # wait for firefox…
    @wait(50).then ->
      @openCover($target)
        .done(@openPanel)
      $target.addClass(options.activeClass)
    pubsub('projects').publish('openStart')
    this

  openCover: ($target) ->
    # background $dark-grey
    @log 'open Cover'
    index = @all.index $target
    direction = if index % 3 is 1 then 1 else -1
    $target
      .find '.hw-projects-cover'
      .css 'z-index', 2
      .velocity
        properties:
          height: '150%'
          top: '-25%'
          skewY: [0, direction * 26.5]
          backgroundColorRed:   options['$dark-gray'].r
          backgroundColorGreen: options['$dark-gray'].g
          backgroundColorBlue:  options['$dark-gray'].b
        options:
          ease: 'ease'
          duration: 500

  openPanel: (cover) =>
    @log 'open Panel'
    $cover = $(cover)
    $cover
      .velocity
        properties:
          rotateY: [180, 0]
        options:
          ease: 'ease'
          duration: 500

    $window       = $(window)

    coverOffset   = $cover.offset()
    coverWidth    = $cover.width()
    coverHeight   = $cover.height()

    windowWidth   = $window.width()
    windowHeight  = $window.height()

    @log 'scaleX', coverWidth / windowWidth
    @log 'scaleY', coverHeight / windowHeight

    # current
    $panel        = $cover.next()

    $panel
      .css {right: 0, bottom: 0, overflow: 'auto'}
      .find '.hw-projects-content'
      .velocity
        properties:
          top: [0, coverOffset.top - $window.scrollTop()]
          left: [0, coverOffset.left - $window.scrollLeft()]
          rotateY: [0, 180]
          scaleX: [1, coverWidth / windowWidth]
          scaleY: [1, coverHeight / windowHeight]
        options:
          ease: 'ease'
          duration: 500

  close: (e) ->
    @log 'Projects close'
    e.preventDefault()
    e.stopImmediatePropagation()
    pubsub('projects').publish('closeStart')
    # Reset scroll to top
    # So the backface of the project appear on the animation
    @container.scrollTop(0)
    @clean()
    this

module.exports = Projects