#
# Name          : hCarrousel
# Author        : Hiswe halya, https://github.com/hiswe
# Version       : 0.0.4\
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
      autoplay:         false
      autoplayDelay:    5000
    }

    constructor: (elements, options = {}) ->
      @opts     = buildAnimationClass( $.extend( {}, @defaults, options))
      @el       = $(elements)
      init      = @_init()
      return @log('Not enough slides for ', @el) unless init
      @_bind()
      @el.trigger 'hcarrouselcreate'
      @opts.create.apply @el[0], [{el: @el}]
      @autoplay() if @opts.autoplay is on
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
      @log 'init with', @size, 'items'
      true

    _bind: ->
      if @opts.prevButton is off and @opts.nextButton is off
        @el.on 'pointerdown', @forward
        return this

      # Prevent image drag
      # While dragging, stopEvent used by the swipe plugin doesn't fire
      @el.find('img').on 'dragstart', -> false

      @el.on 'pointerswiperight', @forward
      @el.on 'pointerswipeleft', @backward
      @el.on 'hcarrouselplay', => @autoplay(true)
      @el.on 'hcarrouselpause', => @autoplay(false)

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

    autoplay: (play = on) ->
      @log 'autoplay', play
      return window.clearTimeout(@timer) if play is off
      @timer = window.setTimeout @forward, @opts.autoplayDelay

    # Call an instance method from outside
    _bridge: (method, args...) ->
      @log 'bridge', method, args
      return unless method?
      return if typeof method isnt 'string'
      return if method.charAt(0) is '_'
      @[method]?(args...)

    _circle: ($current, direction) ->
      @log 'circle', direction

      $next     = @slides.eq @selectionIndex
      inClass   = @opts["#{direction}In"]
      outClass  = @opts["#{direction}Out"]

      # In case of autoplay
      window.clearTimeout @timer

      # Css transitions
      $current.one('transitionend', (e) =>
        $current.removeClass(outClass)
        @hold = false
        @autoplay()
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
