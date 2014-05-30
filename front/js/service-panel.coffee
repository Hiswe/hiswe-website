$           = require 'jquery'
Controller  = require './front-controller'
shared      = require '../../shared/stylus-var'
pubsub      = require './pubsub'

easingDico = {
  easeInCubic: [0.550, 0.055, 0.675, 0.190]
  easeOutCubic: [0.215, 0.610, 0.355, 1.000]
}

getEase = (easingName) ->
  return easingDico[easingName] if easingDico[easingName]?
  easingName

class Service extends Controller
  trace: true
  logPrefix: 'SERVICE'

  elements: {
    '.hw-services-cover'    : 'cover'
    '.hicon'                : 'icon'
    '.hw-services-cover h6' : 'title'
    '.hw-sub-left'          : 'leftPanel'
    '.hw-sub-right'         : 'rightPanel'
    '.hw-sub-close'         : 'closeButton'
  }

  events: {
    'tap .hw-services-cover'  : 'open'
    'tap .hw-sub-close'       : 'close'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'

    # TODO Group all marker
    # @all = @el.add(@icon).
    # pubsub('body').subscribe (event) =>
    #   @clean() if event is 'tap'

    # pubsub('projects').subscribe (event) =>
    #   @clean() if event is 'openStart'

    pubsub('resizeEnd').subscribe @setup
    @setup($(window).width())

    this

  ########
  #  UTILITY
  ########

  setup: (windowWidth) =>
    modulo      = if windowWidth >= shared.desktopWidth then 3 else 2
    direction   = if @index % modulo is 1 then 1 else -1
    @skew       = 26.5 * direction
    @color      = if direction > 0 then shared['$gray'] else {r:255, g: 255, b:255}
    switch
      when windowWidth > shared.tabletWidth then @md = 'desktop'
      when windowWidth < shared.mobileWidth then @md = 'mobile'
      else @md = 'tablet'

    @rotation   = if @md is 'desktop' then '98.5deg' else '90deg'

  runSequence: (sequence) ->
    @log sequence
    # this is to run methods on a specific order
    # the sequence is an array where we have sequenceName-sequenceParam
    # && mean the animations should run in parallel
    for method, index in sequence
      sequence[index] = method.split('&&')

    # Format param names
    call = (index, method) =>
      exec = /^([^\-]*)-(.*)/.exec(method)
      if exec
        method = exec[1]
        params = exec[2].split('-')
      else
        params = null

      @log 'run', index, method
      @[method].apply(this, params)

    # Make a small iterator
    run = (index) =>
      method  = sequence[index]
      dfdList = (call(index, methodName) for methodName in method)
      $.when.apply(this, dfdList).done =>
        @log 'finish', index, method
        index = index + 1
        run(index) if index < sequence.length

    # launch the sequence !
    run(0)

  ########
  #  OPEN
  ########

  open: (e) ->
    @log 'Service open'
    e.stopPropagation()
    return if @el.hasClass shared.activeClass
    @el.addClass shared.activeClass
    @runSequence @openingSequence()
    e.preventDefault()
    pubsub('services').publish('open')
    this

  openingSequence: ->
    sequence = []
    @log @md
    switch @md
      when 'desktop'
        switch @index
          when 0 then sequence = ['openCover', 'translateCover-right', 'rotatePanel-right-easeOutCubic']
          when 1 then sequence = ['openCover', 'rotatePanel-left&&rotatePanel-right']
          when 2 then sequence = ['openCover', 'translateCover-left', 'rotatePanel-left-easeOutCubic']
      when 'tablet'
        sequence = ['rotatePanel-left&&rotatePanel-right']
      when 'mobile'
        sequence = ['mobileRotate', 'mobileDeploy']
        # sequence = ['openSetup', 'mobileRotate']

    ['openSetup'].concat(sequence).concat ['openEnd']

  openSetup: ->
    dfd = new $.Deferred()
    @el.css 'z-index', 2
    setTimeout dfd.resolve, 50
    dfd.promise()

  openCover: ->
    dfd = new $.Deferred()
    # container
    @el.velocity
      properties:
        height: ['150%', '100%']
        top: ['-25%', '0%']
        marginBottom: ['-25%', '0%']
    # cover
    @cover.velocity
      properties:
        skewY: ['0deg', @skew]
        translateZ: [0, 0] # fix some rendering issue
        backgroundColorRed:   shared['$dark-gray'].r
        backgroundColorGreen: shared['$dark-gray'].g
        backgroundColorBlue:  shared['$dark-gray'].b
      options:
        complete: dfd.resolve
    # title
    @title.velocity
      properties:
        colorRed:   shared['$gray'].r
        colorGreen: shared['$gray'].g
        colorBlue:  shared['$gray'].b

    # icon
    @icon.velocity
      properties:
        skewY: ['0deg', @skew * - 1]
        colorRed:   shared['$darkest-gray'].r
        colorGreen: shared['$darkest-gray'].g
        colorBlue:  shared['$darkest-gray'].b
        fontSize: ['12em', '6em']
    dfd.promise()

  translateCover: (direction) ->
    tx = if direction is 'left' then '-100%' else '100%'
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    dfd = new $.Deferred()
    @cover.css('z-index', 2).velocity
      properties:
        translateX: [tx, '0%']
      options:
        easing: getEase('easeInCubic')
        complete: dfd.resolve
    $underPanel.show()
    dfd.promise()

  rotatePanel: (direction, ease = 'ease') ->
    @log getEase(ease)
    dfd = new $.Deferred()
    ry = if direction is 'left' then @rotation else '-' + @rotation

    @["#{direction}Panel"]
      .css({
        visibility: 'visible'
        'z-index': 3
      })
      .velocity
        properties:
          rotateY: ['0deg', ry]
        options:
          display: 'block'
          easing: getEase(ease)
          complete: dfd.resolve

    dfd.promise()

  openEnd: =>
    dfd = new $.Deferred()
    @closeButton.css 'opacity', 1
    setTimeout dfd.resolve, 250
    dfd.promise()

  # Mobile
  mobileRotate: (direction) =>

    dfd = new $.Deferred()
    @cover.velocity
      properties:
        rotateX: ['-180deg', '0deg']

    @leftPanel.velocity
      properties:
        rotateX: ['0deg', '180deg']
      options:
        complete: dfd.resolve
        duration: 750
        display: 'block'

    @rightPanel.hide()

    dfd.promise()

  mobileDeploy: (direction) =>
    dfd = new $.Deferred()
    @rightPanel.velocity
      properties:
        rotateX: ['0deg', '180deg']
      options:
        complete: dfd.resolve
        display: 'block'
    dfd.promise()

  ########
  #  CLOSE
  ########

  close: (e) ->
    @log 'Service close'
    e.preventDefault()
    e.stopImmediatePropagation()
    @closeButton.css 'opacity', 0
    @runSequence @closingSequence()
    this

  closingSequence: ->
    sequence = ''
    @log @md
    switch @md
      when 'desktop'
        switch @index
          when 0 then sequence = ['resetRotation-right-easeInCubic', 'resetTranslate-right', 'closeCover']
          when 1 then sequence = ['resetRotation-left&&resetRotation-right', 'closeCover']
          when 2 then sequence = ['resetRotation-left-easeInCubic', 'resetTranslate-left', 'closeCover']
      when 'tablet'
        sequence = ['resetRotation-left&&resetRotation-right']
      when 'mobile'
        sequence = ['resetMobileDeploy', 'resetMobileRotate']

    sequence.concat ['closeEnd']

  resetRotation: (direction, ease = 'ease') ->
    dfd = new $.Deferred()
    @["#{direction}Panel"].velocity 'reverse', {
      complete: dfd.resolve
      # https://github.com/julianshapiro/velocity/issues/90
      # easing: getEase(ease)
    }
    dfd.done => @["#{direction}Panel"].css 'visibility', 'hidden'
    dfd.promise()

  resetTranslate: (direction) ->
    dfd = new $.Deferred()
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    @cover.velocity 'reverse', {
      complete: dfd.resolve
      # https://github.com/julianshapiro/velocity/issues/90
      # easing: getEase('easeOutCubic')
    }
    dfd.done ->
      $underPanel.css({visibility: 'hidden' })
    dfd.promise()

  closeCover: ->
    dfd = new $.Deferred()
    @el.velocity 'reverse'
    @cover.velocity
      properties:
        skewY: [@skew, 0]
        backgroundColorRed:   @color.r
        backgroundColorGreen: @color.g
        backgroundColorBlue:  @color.b
      options:
        complete: dfd.resolve

    @title.velocity 'reverse'
    @icon.velocity 'reverse'
    dfd.promise()

  closeEnd: ->
    dfd = new $.Deferred()
    @el.removeClass(shared.activeClass)
    pubsub('services').publish('close')
    @el.removeAttr 'style'
    @cover.removeAttr 'style'
    @icon.removeAttr 'style'
    @rightPanel.removeAttr 'style'
    @leftPanel.removeAttr 'style'
    @title.removeAttr 'style'
    setTimeout dfd.resolve, 250
    dfd.promise()

  # mobile
  resetMobileDeploy: ->
    dfd = new $.Deferred()
    @rightPanel.velocity 'reverse', {complete: dfd.resolve}
    dfd.promise()

  resetMobileRotate: ->
    dfd = new $.Deferred()
    @leftPanel.velocity 'reverse'
    @cover.velocity 'reverse', {complete: dfd.resolve}
    dfd.promise()

module.exports = Service
