$           = require 'jquery'
Controller  = require './front-controller'
shared      = require '../../shared/stylus-var'
pubsub      = require './pubsub'

class Service extends Controller
  trace: true
  logPrefix: 'SERVICE'
  opened: false

  elements: {
    '.hw-services-cover': 'cover'
    '.hicon'            : 'icon'
    '.hw-sub-left'      : 'leftPanel'
    '.hw-sub-right'     : 'rightPanel'
    '.hw-sub-close'     : 'closeButton'
  }

  events: {
    'tap .hw-services-cover'  : 'open'
    'tap .hw-sub-close'       : 'close'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    pubsub('body').subscribe (event) =>
      @clean() if event is 'tap'

    pubsub('projects').subscribe (event) =>
      @clean() if event is 'openStart'

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

  runSequence: (sequence) ->
    # this is to run methods on a specific order
    # the sequence is a string where where we have sequenceName-sequenceParam
    # && mean the animations should run in parallel
    sequence = sequence.split(' ')
    for method, index in sequence
      sequence[index] = method.split('&&')

    # Format param names
    call = (index, method) =>
      exec = /([^-]*)-([^-]*)/.exec(method)
      if exec
        method = exec[1]
        params = exec[2]
      else
        params = null

      @log 'run', index, method
      @[method](params)

    # Make a small iterator
    run = (index) =>
      method  = sequence[index]
      dfdList = (call(index, methodName) for methodName in method)
      $.when.apply(this, dfdList).done =>
        @log 'finish', index, method
        index = index + 1
        if index < sequence.length
          run(index)

    # launch the sequence !
    run(0)

  transitionend: (event) ->
    e = event.originalEvent
    return unless event.originalEvent?
    return unless /cover/.test event.target.className
    return unless /transform/.test e.propertyName
    if @opened is on
      @log 'transition end::', 'close'
      @el.css('z-index', 1)
      pubsub('services').publish('close')
      @opened = false
    else
      @log 'transition end ::','open'
      @opened = true

  ########
  #  OPEN
  ########

  open: (e) ->
    @log 'Service open'
    e.stopPropagation()
    @el.addClass shared.activeClass
    @runSequence @openingSequence()
    # return if @el.hasClass shared.activeClass
    e.preventDefault()
    pubsub('services').publish('open')
    this

  openingSequence: ->
    sequence = ''
    @log @md
    switch @md
      when 'desktop'
        switch @index
          when 0 then sequence = 'openCover translateCover-right rotatePanel-right'
          when 1 then sequence = 'openCover rotatePanel-left&&rotatePanel-right'
          when 2 then sequence = 'openCover translateCover-left rotatePanel-left'
      when 'tablet'
        sequence = 'rotatePanel-left&&rotatePanel-right'
      when 'mobile'
        sequence = 'translatePanel-left translatePanel-right'

    sequence + ' openEnd'

  openCover: ->
    dfd = new $.Deferred()
    # container
    @el.css('z-index': 10).velocity
      properties:
        height: ['150%', '100%']
        top: ['-25%', '0%']
        marginBottom: ['-25%', '0%']
    # cover
    @cover.velocity
      properties:
        skewY: [0, @skew]
        backgroundColorRed:   shared['$dark-gray'].r
        backgroundColorGreen: shared['$dark-gray'].g
        backgroundColorBlue:  shared['$dark-gray'].b
      options:
        complete: dfd.resolve
    # icon
    @icon.velocity
      properties:
        skewY: [0, @skew * - 1]
        colorRed:   shared['$darkest-gray'].r
        colorGreen: shared['$darkest-gray'].g
        colorBlue:  shared['$darkest-gray'].b
        fontSize: ['12em', '6em']
      options:
        ease: 'ease'
        duration: 500
    dfd.promise()

  translateCover: (direction) ->
    tx = if direction is 'left' then '-100%' else '100%'
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    dfd = new $.Deferred()
    @cover.css('z-index', 2).velocity
      properties:
        translateX: [tx, 0]
      options:
        complete: dfd.resolve
    $underPanel.css({
      visibility: 'visible'
    })
    dfd.promise()

  rotatePanel: (direction) ->
    dfd = new $.Deferred()
    ry = if direction is 'left' then '98.75deg' else '-98.75deg'

    @["#{direction}Panel"]
      .css({
        visibility: 'visible'
      })
      .velocity
        properties:
          rotateY: [0, ry]
        options:
          complete: dfd.resolve

    dfd.promise()

  openEnd: =>
    dfd = new $.Deferred()
    @closeButton.css 'opacity', 1
    setTimeout dfd.resolve, 250
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
          when 0 then sequence = 'resetRotation-right resetTranslate-right closeCover'
          when 1 then sequence = 'resetRotation-left&&resetRotation-right closeCover'
          when 2 then sequence = 'resetRotation-left resetTranslate-left closeCover'
      when 'tablet'
        sequence = 'resetRotation-left&&resetRotation-right'
      when 'mobile'
        sequence = 'translatePanel-left translatePanel-right'

    sequence + ' closeEnd'

  resetRotation: (direction) ->
    dfd = new $.Deferred()
    @["#{direction}Panel"].velocity 'reverse', {complete: dfd.resolve}
    dfd.done => @["#{direction}Panel"].css 'visibility', 'hidden'
    dfd.promise()

  resetTranslate: (direction) ->
    dfd = new $.Deferred()
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    @cover.velocity 'reverse', {complete: dfd.resolve}
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
    setTimeout dfd.resolve, 250
    dfd.promise()


module.exports = Service
