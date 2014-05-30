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
    '.hw-services-cover'                  : 'cover'
    '.hicon'                              : 'icon'
    '.hw-services-cover h6'               : 'title'
    '.hw-sub-left'                        : 'leftPanel'
    '.hw-sub-right'                       : 'rightPanel'
    '.hw-sub-close'                       : 'closeButton'
    '.hw-sub, .hicon,  h6'                : 'all'
    '.hw-sub-description, .hw-sub-close'  : 'sidePanels'
  }

  events: {
    'tap .hw-services-cover'  : 'open'
    'tap .hw-sub-close'       : 'close'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    # @all = @all.add(@el)

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

    @rotation   = if @md is 'desktop' then 98.5 else 90

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
        params = []

      dfd = new $.Deferred()
      params.unshift(dfd)

      @log 'run', index, method
      @[method].apply(this, params)
      dfd.promise()

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

  openSetup: (dfd) ->
    # Prevent all what the addClass will do
    # we will animate that
    # Bu we still need the CSS code in case of resizing %)
    @wait(50).then =>
      @sidePanels.hide()
      @cover
        .css({
          left: '0%'
          height: '100%'
          top: '0%'
          marginBottom: '0%'
        })
        .css @prefix('transform'), "skewY(#{@skew}deg)"
      @pristineElStyle =  @el.attr('style')
      @log @pristineElStyle
      @el.css {
        'z-index': 2
        height: '100%'
        top: '0%'
        marginBottom: '0%'
      }
      # Now that everything is overided
      # We can launch the fun…
      @el.addClass(shared.activeClass)
      dfd.resolve()

  openCover: (dfd) ->
    # container
    @el.velocity
      properties:
        height: '150%'
        top: '-25%'
        marginBottom: '-25%'
      options:
        _cacheValues: false

    # cover
    @cover.velocity
      properties:
        skewY: [0, @skew]
        translateZ: [0, 0] # fix some rendering issue
        backgroundColor:   shared['$dark-gray'].r
        backgroundColorGreen: shared['$dark-gray'].g
        backgroundColorBlue:  shared['$dark-gray'].b
        # backgroundColor: colors.darkGray
      options:
        complete: dfd.resolve
        _cacheValues: false

    # title
    @title.velocity
      properties:
        colorRed:   shared['$gray'].r
        colorGreen: shared['$gray'].g
        colorBlue:  shared['$gray'].b
      options:
        _cacheValues: false

    # icon
    @icon.velocity
      properties:
        skewY: [0, @skew * - 1]
        colorRed:   shared['$darkest-gray'].r
        colorGreen: shared['$darkest-gray'].g
        colorBlue:  shared['$darkest-gray'].b
        fontSize: ['12em', '6em']
      options:
        _cacheValues: false

  translateCover: (dfd, direction) ->
    tx = if direction is 'left' then '-100%' else '100%'
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    @cover.css('z-index', 2).velocity
      properties:
        translateX: [tx, '0%']
      options:
        easing: getEase('easeInCubic')
        complete: dfd.resolve
        _cacheValues: false
    $underPanel.show()

  rotatePanel: (dfd, direction, ease = 'ease') ->
    ry = if direction is 'left' then @rotation else '-' + @rotation

    @["#{direction}Panel"].velocity {
      properties:
        rotateY: ['0deg', ry]
      options:
        display: 'block'
        easing: getEase(ease)
        complete: dfd.resolve
        _cacheValues: false
    }

  openEnd: (dfd) =>
    # Remove everything so during resize, the responsive rules still applies
    @all.removeAttr('style').show()
    @el.attr 'style', @pristineElStyle
    @closeButton.velocity('fadeIn', {display: 'block'})
    setTimeout dfd.resolve, 250

  # Mobile
  mobileRotate: (dfd, direction) =>
    @cover.velocity
      properties:
        rotateX: [-180, 0]
      options:
        _cacheValues: false

    @leftPanel.velocity
      properties:
        rotateX: [0, 180]
      options:
        complete: dfd.resolve
        duration: 750
        display: 'block'

    @rightPanel.hide()

  mobileDeploy: (dfd, direction) =>
    @rightPanel.velocity
      properties:
        rotateX: [0, 180]
      options:
        complete: dfd.resolve
        display: 'block'
        _cacheValues: false

  ########
  #  CLOSE
  ########

  close: (e) ->
    @log 'Service close'
    e.preventDefault()
    e.stopImmediatePropagation()
    @closeButton.hide()
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

  # Reverse have to be handled very carefully
  # as a resize may have occured during this time
  resetRotation: (dfd, direction, ease = 'ease') ->
    ry = if direction is 'left' then @rotation else '-' + @rotation

    @["#{direction}Panel"].velocity {
      properties:
        rotateY: [ry, '0deg']
      options:
        display: 'block'
        easing: getEase(ease)
        _cacheValues: false
        complete: dfd.resolve
    }
    dfd.done => @["#{direction}Panel"].css 'visibility', 'hidden'

  resetTranslate: (dfd, direction) ->
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    @cover.velocity
      properties:
        translateX: ['0%', '0%']
        left: '0%'
      options:
        easing: getEase('easeOutCubic')
        _cacheValues: false
        complete: dfd.resolve
    dfd.done ->
      $underPanel.hide()

  closeCover: (dfd) ->
    # container
    @el.velocity
      properties:
        height: '100%'
        top: '0%'
        marginBottom: '0%'
      options:
        _cacheValues: false

    # cover
    @cover.velocity
      properties:
        skewY: [@skew, 0]
        backgroundColorRed:   @color.r
        backgroundColorGreen: @color.g
        backgroundColorBlue:  @color.b
      options:
        complete: dfd.resolve
        _cacheValues: false

    @title.velocity
      properties:
        colorRed:   shared['$dark-gray'].r
        colorGreen: shared['$dark-gray'].g
        colorBlue:  shared['$dark-gray'].b
      options:
        _cacheValues: false

    @icon.velocity
      properties:
        skewY: [@skew * - 1, 0]
        colorRed:   shared['$pink'].r
        colorGreen: shared['$pink'].g
        colorBlue:  shared['$pink'].b
        fontSize:   ['6em', '12em']
      options:
        _cacheValues: false

  closeEnd: (dfd) ->
    @wait(50).then =>
      @all.removeAttr 'style'
      # remove only custom style
      # HammerJS use some style too…
      @el.attr 'style', @pristineElStyle
      @el.removeClass(shared.activeClass)
      pubsub('services').publish('close')
      dfd.resolve()

  # mobile
  resetMobileDeploy: (dfd) ->
    @rightPanel.velocity 'reverse', {complete: dfd.resolve}

  resetMobileRotate: (dfd) ->
    @leftPanel.velocity 'reverse'
    @cover.velocity 'reverse', {complete: dfd.resolve}

module.exports = Service
