#
# Name          : hCarrousel
# Author        : Hiswe halya, https://github.com/hiswe
# Version       : 0.0.3
# Repo          :
# Website       :
# Dependencies  : https://github.com/jquery/jquery-pointer-events
#                 h-swipe
#

(($, document, window) ->

  # Utility method
  lcFirst = (text) ->
    text.substr(0, 1).toLowerCase() + text.substr(1)

  ucFirst = (text) ->
    text.substr(0, 1).toUpperCase() + text.substr(1)

  # Determine Css Animation/Transition Support
  # see https://github.com/angular/angular.js/blob/master/src/ng/sniffer.js
  sniffer = (->
    vendorPrefix  = ''
    cssPrefix     = ''
    vendorRegex   = /^(Moz|webkit|O|ms)(?=[A-Z])/
    bodyStyle     = document.body and document.body.style
    transitions   = false
    animations    = false

    if bodyStyle
      for prop of bodyStyle
        match = vendorRegex.exec(prop)
        if match
          vendorPrefix  = ucFirst(match[0])
          # This is the prefix used in getComputedStyle
          cssPrefix     = match[0]
          break

      transitions = !!(bodyStyle["transition"]? or bodyStyle["#{vendorPrefix}Transition"]?)
      animations  = !!(bodyStyle["animation"]? or bodyStyle["#{vendorPrefix}Animation"]?)

    eventList = {
      'default':'transitionend animationend'
      'Ms':'MSTransitionEnd MSAnimationEnd'
      'O':'oTransitionEnd oAnimationEnd'
      'Moz':'transitionend animationend'
      'Webkit':'webkitTransitionEnd webkitAnimationEnd'
    }

    if transitions is off and animations is off
      events = ''
    else if vendorPrefix is ''
      events = eventList.default
    else
      events = eventList[vendorPrefix]

    return {
      vendorPrefix: vendorPrefix
      cssPrefix:    cssPrefix
      transitions:  transitions
      animations:   animations
      events:       events
    }
  )()

  # Transition class generation
  buildAnimationClass = (settings) ->
    base = settings.className
    for state in ['forward', 'backward']
      for status in ['out', 'in']
          prop  = "#{state}#{ucFirst(status)}"
          val   = "#{base}-#{state}-#{status}"
          settings[prop] = val

    settings.setup = "#{base}-setup"
    settings

  # Carrousel class
  class HCarrousel
    defaults: {
      className:        'hCarrousel'
      activeClassName:  'hCarrousel-active'
      childSelector:    'li'
      debug:            false
      create:           $.noop
      prevButton:       false
      nextButton:       false
    }

    constructor: (elements, options = {}) ->
      @opts     = buildAnimationClass( $.extend( {}, @defaults, options))
      @el       = $(elements)
      init      = @_init()
      return @log('Not enough slides for ', @el) unless init
      @_bind()
      @el.trigger 'hcarrouselcreate'
      @opts.create.apply @el[0], [{el: @el}]
      this

    _init: ->
      @slides         = @el.find @opts.childSelector
      @size           = @slides.length
      return false unless @size > 1
      @el.addClass(@opts.className)
      @slides.eq(0).addClass(@opts.activeClassName)
      @selectionIndex = 0
      # Don't run the carrousel until animation is completed
      @hold           = false
      @animation      = @_isAnimated()
      @log 'init with', @size, 'items'
      true

    _isAnimated: ->
      return false unless (sniffer.transitions and sniffer.animations)
      # Test if slide elements has animations or transitions
      style       = window.getComputedStyle(@slides[0]) or {}
      prefix      = sniffer.cssPrefix
      isAnimated  = false
      for key in ["TransitionDuration", "AnimationDuration"]
        hasDuration = style[lcFirst(key)] or style["#{prefix}#{key}"]
        if hasDuration? and hasDuration isnt ''
          isAnimated = true
          break
      isAnimated

    _bind: ->
      if @opts.prevButton is off and @opts.nextButton is off
        @el.on 'pointerdown', @forward
        return this

      # Prevent image drag
      # While dragging, stopEvent used by the swipe plugin doesn't fire
      @el.find('img').on 'dragstart', -> false

      @el.on 'swiperight', @forward
      @el.on 'swipeleft', @backward

      if @opts.prevButton instanceof jQuery
        @log 'Define custom prev control'
        @opts.prevButton.on 'pointerdown', (e) =>
          e.preventDefault()
          @backward()

      if @opts.nextButton instanceof jQuery
        @log 'Define custom next control'
        @opts.nextButton.on 'pointerdown', (e) =>
          e.preventDefault()
          @forward()
      this

    forward: =>
      return this if @hold
      @hold = true
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex - 1 < 0
        @selectionIndex = @size - 1
      else
        @selectionIndex = @selectionIndex - 1
      @_circle $current, 'forward'

    backward: =>
      return this if @hold
      @hold = true
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex + 1 >= @size
        @selectionIndex = 0
      else
        @selectionIndex = @selectionIndex + 1
      @_circle $current, 'backward'

    # Call an instance method from outside
    _bridge: (method, args...) ->
      @log 'bridge', method, args
      return unless method?
      return if typeof method isnt 'string'
      return if method.charAt( 0 ) is '_'
      @[method]?(args...)

    _circle: ($current, direction) ->
      $next = @slides.eq @selectionIndex
      @log 'circle', direction

      if @animation is off
        $current.removeClass @opts.activeClassName
        $next.addClass @opts.activeClassName
        @hold = false
        return this

      inClass   = @opts["#{direction}In"]
      outClass  = @opts["#{direction}Out"]

      # Css transitions
      $current.one(sniffer.events, (e) =>
        $current.removeClass(outClass)
        @hold = false
      )

      $current.removeClass(@opts.activeClassName)
        .addClass(outClass)

      $next.addClass("#{@opts.setup} #{inClass}")
      window.setTimeout =>
        # request property that requires layout to force a layout
        # see http://stackoverflow.com/questions/12088819/css-transitions-on-new-elements
        $next[0].clientHeight
        $next.removeClass("#{@opts.setup} #{inClass}")
          .addClass(@opts.activeClassName)
      , 10
      this

    destroy: ->
      @log 'destroy'
      @el.off('.hCarrousel').removeClass(@opts.className)
      @slides.eq(@selectionIndex).removeClass(@opts.activeClassName)
      @el.removeData('hCarrousel')
      # TODO generate an event uid for each instance
      if @opts.prevButton instanceof jQuery
        @opts.prevButton.off '.hCarrousel'
      if @opts.nextButton instanceof jQuery
        @opts.nextButton.off '.hCarrousel'
      @el

    log: (args...) ->
      return unless @opts.debug
      args.unshift('[H-Carrousel]')
      console?.log?(args...)
      this

  # Export sniffer if someone want to use it elsewhere
  HCarrousel::sniffer = sniffer
  # Export plugin
  $.HCarrousel = HCarrousel

  # Plugin definition
  $.fn.hCarrousel = (args...) ->
    this.each ->
      $el = $(this)
      hCarrousel = $el.data('hCarrousel')
      if hCarrousel is undefined
        # Create instance
        plugin = new $.HCarrousel( this, args[0] )
        $el.data( 'hCarrousel', plugin )
      else
        # Call hCarrousel method
        $.HCarrousel::_bridge.apply hCarrousel, args
        $el

)(jQuery, document, window)
