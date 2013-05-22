class Controller
  eventSplitter: /^(\S+)\s*(.*)$/
  trace: false
  logPrefix: '(App)'

  log: (args...) ->
    return unless @trace
    if @logPrefix then args.unshift(@logPrefix)
    console?.log?(args...)
    this

  warn: (args...) ->
    return unless @trace
    if @logPrefix then args.unshift(@logPrefix)
    console?.warn?(args...)
    this

  delay: (func, timeout) ->
    setTimeout(@proxy(func), timeout || 0)

  proxy: (func) ->
    => func.apply(this, arguments)

  constructor: (options) ->
    @options = options or {}

    for key, value of @options
      @[key] = value

    return @warn('initialization aborted') unless @el? and @el.length
    # Use jQuery for events
    @e = $({})

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

      if selector is ''
        @el.on(eventName, method)
      else
        @el.on(eventName, selector, method)

hw.Controller = Controller
