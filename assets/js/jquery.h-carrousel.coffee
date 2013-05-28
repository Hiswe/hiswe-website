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

  # Carrousel class
  class HCarrousel
    log: (args...) ->
      return unless @settings.debug
      args.unshift('[H-Carrousel]')
      console?.log?(args...)
      this

    constructor: (elements, options = {}) ->
      @settings = $.extend( {}, @defaults, options )
      @el       = $(elements).addClass(@settings.className)
      @init()
      @bind()
      @el.trigger 'hCarrouselCreate'
      this

    init: ->
      @slides         = @el.find @settings.childSelector
      @slides.eq(0).addClass(@settings.activeClassName)
      @size           = @slides.length
      @selectionIndex = 0
      @log 'init with', @size, 'items'

    bind: ->
      @el.on 'click.hCarrousel', @next

    prev: =>
      @log 'prev'
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex - 1 < 0
        @selectionIndex = @size - 1
      else
        @selectionIndex = @selectionIndex - 1
      $next = @slides.eq @selectionIndex
      @circle($current, $next)

    next: =>
      @log 'next'
      $current = @slides.eq(@selectionIndex)
      if @selectionIndex + 1 >= @size
        @selectionIndex = 0
      else
        @selectionIndex = @selectionIndex + 1
      $next = @slides.eq @selectionIndex
      @circle($current, $next)

    circle: ($current, $next) =>
      @log 'circle'
      window.setTimeout =>
        $current.removeClass @settings.activeClassName
        $next.addClass @settings.activeClassName
      , 1
      this

    defaults: (->
      defaults = {
        className:        'hCarrousel'
        activeClassName:  'hCarrousel-active'
        childSelector:    'li'
        debug:            true
      }
      for status in ['Enter', 'Leave']
        for state in ['Setup', 'Start']
          prop  = "className#{status}#{state}"
          val   = "#{defaults.className}"
          val   = "#{val}-#{status.toLowerCase()}-#{state.toLowerCase()}"
          defaults[prop] = val
      defaults
    )()

  $.HCarrousel = HCarrousel

  # $.hCarrousel = ( element, options ) ->
  #   # current state
  #   state = ''

  #   # plugin settings
  #   @settings = {}

  #   # jQuery version of DOM element attached to the plugin
  #   @el  = $ element

  #   # set current state
  #   @setState = ( _state ) -> state = _state

  #   #get current state
  #   @getState = -> state

  #   # get particular plugin setting
  #   @getSetting = ( key ) ->
  #     @settings[ key ]

  #   # call one of the plugin setting functions
  #   @callSettingFunction = ( name, args = [] ) ->
  #     @settings[name].apply( this, args )

  #   @init = ->
  #     @settings = $.extend( {}, @defaults, options )

  #     @el.addClass @settings.className

  #     @setState 'ready'

  #   # initialise the plugin
  #   @init()

  #   # make the plugin chainable
  #   this


  # Plugin definition
  $.fn.hCarrousel = ( options ) ->
    this.each ->
      $el = $(this)
      if $el.data( 'hCarrousel' ) is undefined
        plugin = new $.HCarrousel( this, options )
        $el.data( 'hCarrousel', plugin )

)(jQuery, document, window)
