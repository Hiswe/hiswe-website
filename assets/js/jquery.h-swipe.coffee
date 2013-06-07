#
# Name          : hswipe
# Author        : Hiswe halya, https://github.com/hiswe
# Version       : 0.0.1
# Repo          :
# Website       :
# Dependencies  : https://github.com/jquery/jquery-pointer-events
#


(($, document, window) ->
  trace       = false
  startEvent  = "pointerdown"
  stopEvent   = "pointerup"
  moveEvent   = "pointermove"

  log = (args...) ->
    return unless trace
    args.unshift('[SWIPE]')
    console?.log?(args...)

  triggerCustomEvent = (obj, eventType, event) ->
    originalType = event.type
    event.type = eventType
    $.event.dispatch.call(obj, event)
    event.type = originalType

  $.event.special.swipe = {
    scrollSupressionThreshold: 30 # More than this horizontal displacement, and we will suppress scrolling.

    durationThreshold: 1000  # More time than this, and it isn't a swipe.

    horizontalDistanceThreshold: 30 # Swipe horizontal displacement must be more than this.

    verticalDistanceThreshold: 75  # Swipe vertical displacement must be less than this.

    start: (event) ->
      data = event
      {
        time: ( new Date() ).getTime()
        coords: [ data.pageX, data.pageY ]
        origin: $( event.target )
      }

    stop: (event) ->
      data = event
      {
        time: ( new Date() ).getTime()
        coords: [ data.pageX, data.pageY ]
      }

    handleSwipe: (start, stop, thisObject, origTarget) ->
      durationTest = stop.time - start.time < $.event.special.swipe.durationThreshold
      hDistanceTest = Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold
      vDistanceTest = Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold
      log 'handleSwipe', durationTest, hDistanceTest, vDistanceTest

      if durationTest and hDistanceTest and vDistanceTest
        direction = start.coords[0] > stop.coords[0]

        direction = if direction then "swipeleft" else "swiperight"
        log 'handleSwipe to direction', direction
        triggerCustomEvent( thisObject, "swipe", $.Event("swipe", { target: origTarget }) )
        triggerCustomEvent( thisObject, direction,$.Event(direction, { target: origTarget }) )

    setup: (e) ->
      log 'setup'
      thisObject = this
      $this = $(thisObject)

      $this.bind(startEvent, (event) ->
        stop = false
        start = $.event.special.swipe.start(event)
        origTarget = event.target

        moveHandler = ( event ) ->
          log 'moveHandler'
          return unless start
          stop = $.event.special.swipe.stop(event)
          # prevent scrolling
          if Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold
            log 'moveHandler', 'prevent scrolling'
            event.preventDefault()

        $this.bind(moveEvent, moveHandler)
          .one(stopEvent, ->
            log 'setup stop', start, stop
            $this.unbind(moveEvent, moveHandler)

            if start and stop
              log 'call handle swipe'
              $.event.special.swipe.handleSwipe(start, stop, thisObject, origTarget)

            start = stop = undefined
        )
      )

    teardown: (e) ->
      log 'teardown'
      $(this).unbind(startEvent).unbind(moveEvent).unbind(stopEvent)

  }

  $.each({
    swipeleft: "swipe"
    swiperight: "swipe"
  }, ( event, sourceEvent ) ->
    $.event.special[ event ] = {
      setup: ->
        log 'setup', event
        $(this).bind(sourceEvent, $.noop)
      teardown: ->
        log 'teardown', event
        $(this).unbind(sourceEvent)
    }
  )

)(jQuery, document, window)
