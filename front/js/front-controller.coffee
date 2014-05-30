$        = require 'jquery'
Hammer   = require 'hammerjs'

gestures = (gesture.name for key, gesture of Hammer.gestures)
uid      = 0

class Controller
  eventSplitter: /^(\S+)\s*(.*)$/
  trace: false
  logPrefix: '(App)'

  log: (args...) ->
    return unless @trace
    if @logPrefix then args.unshift("[#{@logPrefix} – #{@uid}]")
    console?.log?(args...)
    this

  warn: (args...) ->
    return unless @trace
    if @logPrefix then args.unshift("[#{@logPrefix} – #{@uid}]")
    console?.warn?(args...)
    this

  wait: (timeout) ->
    dfd = new $.Deferred();
    setTimeout( =>
      dfd.resolveWith(this)
    , timeout || 1 )
    dfd.promise()

  proxy: (func) ->
    => func.apply(this, arguments)

  # Return a css prefix propertie
  prefix: (propertie) ->
    str = Modernizr.prefixed propertie
    str.replace(/([A-Z])/g, (str,m1) -> '-' + m1.toLowerCase() )
      .replace(/^ms-/,'-ms-')

  constructor: (options) ->
    uid = uid + 1
    @uid = uid
    @options = options or {}

    for key, value of @options
      @[key] = value

    return @warn('initialization aborted') unless @el? and @el.length

    @refreshElements() if @elements
    @delegateEvents(@events) if @events

  $: (selector) -> $(selector, @el)

  refreshElements: ->
    for key, value of @elements
      @[value] = @$(key)

  delegateEvents: (events) ->
    for key, method of events
      if typeof(method) is 'function'
        # Always return true from event handlers
        method = do (method) => =>
          method.apply(this, arguments)
          true
      else
        unless @[method]
          throw new Error("#{method} doesn't exist")

        method = do (method) => =>
          @[method].apply(this, arguments)
          true

      match      = key.match(@eventSplitter)
      eventName  = match[1]
      selector   = match[2]

      # Hammer js events
      if gestures.indexOf(eventName) isnt -1
        if selector is ''
          @el.hammer().on(eventName, method)
        else
           @el.hammer().on(eventName, selector, method)
      else
        if selector is ''
          @el.on(eventName, method)
        else
           @el.on(eventName, selector, method)

module.exports = Controller
