#
# Name    : hCarrousel
# Author  : Hiswe halya, https://github.com/hiswe
# Version : 0.0.1
# Repo    :
# Website :
#

(($, document, window) ->

  # Utility method: Lower Case the first letter
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

  console.log   sniffer

  # Carrousel class
  class HCarrousel
    defaults: {
      className:        'hCarrousel'
      activeClassName:  'hCarrousel-active'
      childSelector:    'li'
      debug:            true
    }

    constructor: (elements, options = {}) ->
      @opts     = buildAnimationClass( $.extend( {}, @defaults, options))
      @el       = $(elements).addClass(@opts.className)
      @_init()
      @_bind()
      @el.trigger 'hCarrouselCreate'
      @log @opts
      this

    _init: ->
      @slides         = @el.find @opts.childSelector
      @slides.eq(0).addClass(@opts.activeClassName)
      @size           = @slides.length
      @selectionIndex = 0
      @animation      = @_isAnimated()
      @log 'init with', @size, 'items'

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
      @el.on 'click.hCarrousel', @forward

    forward: =>
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex - 1 < 0
        @selectionIndex = @size - 1
      else
        @selectionIndex = @selectionIndex - 1
      @_circle $current, 'forward'

    backward: =>
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex + 1 >= @size
        @selectionIndex = 0
      else
        @selectionIndex = @selectionIndex + 1
      @_circle $current, 'backward'

    _circle: ($current, direction) ->
      $next = @slides.eq @selectionIndex
      @log 'circle', direction

      if @animation is off
        $current.removeClass @opts.activeClassName
        $next.addClass @opts.activeClassName
        return this

      inClass   = @opts["#{direction}In"]
      outClass  = @opts["#{direction}Out"]

      # Css transitions
      $current.one(sniffer.events, (e) =>
        $current.removeClass(outClass)
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
  $.fn.hCarrousel = ( options ) ->
    this.each ->
      $el = $(this)
      hCarrousel = $el.data('hCarrousel')
      if  hCarrousel is undefined
        plugin = new $.HCarrousel( this, options )
        $el.data( 'hCarrousel', plugin )
      # else
        # Call hCarrousel method
        # hCarrousel.callMethod

)(jQuery, document, window)
