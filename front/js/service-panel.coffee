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
    @color      = if direction > 0 then '$gray' else '$white'
    switch
      when windowWidth > shared.tabletWidth then @md = 'desktop'
      when windowWidth < shared.mobileWidth then @md = 'mobile'
      else @md = 'tablet'

    @log 'setup', @md
    @rotation   = if @md is 'desktop' then 98.5 else 90

  runSequence: (sequence) ->
    @log sequence
    # this is to run methods on a specific order
    # the sequence is an array where we have sequenceName-sequenceParam
    # && mean the animations should run in parallel
    for method, index in sequence
      sequence[index] = method.split('&&')

    # Format param names & create the deferred object
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
    switch @md
      when 'desktop'
        switch @index
          when 0 then sequence = ['openSetup', 'openCover', 'translateCover-right', 'rotatePanel-right-easeOutCubic']
          when 1 then sequence = ['openSetup', 'openCover', 'rotatePanel-left&&rotatePanel-right']
          when 2 then sequence = ['openSetup', 'openCover', 'translateCover-left', 'rotatePanel-left-easeOutCubic']
      when 'tablet'
        sequence = ['openSetup', 'rotatePanel-left&&rotatePanel-right']
      when 'mobile'
        sequence = ['mobileOpenSetup', 'mobileRotate', 'mobileDeploy']

    sequence.concat ['openEnd']

  openSetup: (dfd) ->
    # Prevent what the addClass will do
    # we will animate that
    # But we will also need the Stylesheet CSS on done
    # As we wan't to be able to be responsive when panels are open
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
      # Now that everything is overided
      # We can launch the fun…
      @el.addClass(shared.activeClass)
      dfd.resolve()

  mobileOpenSetup: (dfd) ->
    @wait(50).then =>
      @sidePanels.hide()
      @el.addClass(shared.activeClass)
      dfd.resolve()

  openCover: (dfd) ->
    # cover
    @cover.velocity
      properties:
        skewY:      [0, @skew]
        # translateZ: [0, 0] # fix some rendering issue
        backgroundColor: '$dark-gray'
        height: '150%'
        top: '-25%'
      options:
        complete: dfd.resolve
        # _cacheValues: false

    # title
    @title.velocity
      properties:
        color:  '$gray'
      # options:
      #   _cacheValues: false

    # icon
    @icon.velocity
      properties:
        skewY: [0, @skew * - 1]
        color:  '$darkest-gray'
        fontSize: ['12em', '6em']
      # options:
      #   _cacheValues: false

  translateCover: (dfd, direction) ->
    tx = if direction is 'left' then '-100%' else '100%'
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    @cover.velocity
      properties:
        translateX: [tx, '0%']
      options:
        easing: getEase('easeInCubic')
        complete: dfd.resolve
        # _cacheValues: false
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
    }

  openEnd: (dfd) =>
    # Remove everything so during resize, the responsive rules still applies
    @all.removeAttr 'style'
    @all.removeData 'velocity'
    @closeButton.velocity 'fadeIn', {
      display: 'block'
      complete: dfd.resolve
    }

  # Mobile
  mobileRotate: (dfd, direction) =>
    @cover.velocity
      properties:
        rotateX:    [-180, 0]

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

  # Reverse can't be used
  # as a resize may have occured during the open time
  resetRotation: (dfd, direction, ease = 'ease') ->
    ry = if direction is 'left' then @rotation else '-' + @rotation
    @["#{direction}Panel"].velocity {
      properties:
        rotateY: [ry, '0deg']
      options:
        display: 'block'
        easing: getEase(ease)
        complete: dfd.resolve
    }
    dfd.done => @["#{direction}Panel"].css 'visibility', 'hidden'

  resetTranslate: (dfd, direction) ->
    $underPanel = if direction is 'left' then @rightPanel else @leftPanel
    @cover.velocity
      properties:
        left:       '0%'
      options:
        easing: getEase('easeOutCubic')
        complete: dfd.resolve
    dfd.done ->
      $underPanel.hide()

  closeCover: (dfd) ->
    # cover
    @cover.velocity
      properties:
        height: '100%'
        top: '0%'
        skewY: [@skew, 0]
        backgroundColor: @color
      options:
        complete: dfd.resolve

    @title.velocity
      properties:
        color:  '$dark-gray'

    @icon.velocity
      properties:
        skewY: [@skew * - 1, 0]
        color:   '$pink'
        fontSize:   ['6em', '12em']

  closeEnd: (dfd) ->
    @all.removeAttr 'style'
    @all.removeData 'velocity'
    @el.removeClass(shared.activeClass)
    pubsub('services').publish('close')
    @wait(50).then dfd.resolve

  # mobile
  resetMobileDeploy: (dfd) ->
    @rightPanel.velocity
      properties:
        rotateX: [180, 0]
      options:
        complete: dfd.resolve

  resetMobileRotate: (dfd) ->
    @leftPanel.velocity
      properties:
        rotateX: [180, 0]

    @cover.velocity
      properties:
        rotateX:  [0, -180]
      options:
        complete: dfd.resolve

module.exports = Service
