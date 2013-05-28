#
# Name    : hCarrousel
# Author  : Hiswe halya, https://github.com/hiswe
# Version : 0.0.1
# Repo    :
# Website :
#


(($, document, window) ->
  # Determine Css Animation/Transition Support
  # see https://github.com/angular/angular.js/blob/master/src/ng/sniffer.js
  sniffer = (->
    vendorPrefix  = undefined
    vendorRegex   = /^(Moz|webkit|O|ms)(?=[A-Z])/
    bodyStyle     = document.body and document.body.style
    transitions   = false
    animations    = false

    if bodyStyle
      for prop of bodyStyle
        match = vendorRegex.exec(prop)
        if match
          vendorPrefix = match[0]
          vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1)
          break

      transitions = !!(bodyStyle["transition"]? or bodyStyle["#{vendorPrefix}Transition"]?)
      animations  = !!(bodyStyle["animation"]? or bodyStyle["#{vendorPrefix}Animation"]?)

    return {
      vendorPrefix: vendorPrefix
      transitions:  transitions
      animations:   animations
    }
  )()

  # Transition class generation
  buildAnimationClass = (settings) ->
    base = settings.className
    for status in ['out', 'in']
        for state in ['Prev', 'Next']
          prop  = "#{status}#{state}"
          val   = "#{base}-#{status.toLowerCase()}-#{state.toLowerCase()}"
          settings[prop] = val
    settings

  # Carrousel class
  class HCarrousel
    log: (args...) ->
      return unless @opts.debug
      args.unshift('[H-Carrousel]')
      console?.log?(args...)
      this

    constructor: (elements, options = {}) ->
      @opts     = buildAnimationClass( $.extend( {}, @defaults, options))
      @el       = $(elements).addClass(@opts.className)
      @init()
      @bind()
      @el.trigger 'hCarrouselCreate'
      this

    init: ->
      @slides         = @el.find @opts.childSelector
      @slides.eq(0).addClass(@opts.activeClassName)
      @size           = @slides.length
      @selectionIndex = 0
      @log 'init with', @size, 'items'

    bind: ->
      @el.on 'click.hCarrousel', @next

    prev: =>
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex - 1 < 0
        @selectionIndex = @size - 1
      else
        @selectionIndex = @selectionIndex - 1
      @circle $current

    next: =>
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex + 1 >= @size
        @selectionIndex = 0
      else
        @selectionIndex = @selectionIndex + 1
      @circle $current

    circle: ($current) ->
      $next = @slides.eq @selectionIndex
      @log 'circle'
      window.setTimeout =>
        $current.removeClass @opts.activeClassName
        $next.addClass @opts.activeClassName
      , 1
      this

    defaults: {
      className:        'hCarrousel'
      activeClassName:  'hCarrousel-active'
      childSelector:    'li'
      debug:            true
    }

  # Export plugin
  $.HCarrousel = HCarrousel

  # Plugin definition
  $.fn.hCarrousel = ( options ) ->
    this.each ->
      $el = $(this)
      if $el.data( 'hCarrousel' ) is undefined
        plugin = new $.HCarrousel( this, options )
        $el.data( 'hCarrousel', plugin )

)(jQuery, document, window)
