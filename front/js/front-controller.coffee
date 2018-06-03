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
    return propertie

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

module.exports = Controller
