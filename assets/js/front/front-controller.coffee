id = 0

class Controller
  eventSplitter: /^(\S+)\s*(.*)$/
  trace: false
  logPrefix: '(App)'

  @e: $({})

  log: (args...) ->
    return unless @trace
    if @logPrefix then args.unshift("#{@logPrefix} – #{@id}")
    console?.log?(args...)
    this

  warn: (args...) ->
    return unless @trace
    if @logPrefix then args.unshift("#{@logPrefix} – #{@id}")
    console?.warn?(args...)
    this

  delay: (func, timeout) ->
    setTimeout(@proxy(func), timeout || 1)

  wait: (timeout) ->
    dfd = new jQuery.Deferred();
    setTimeout(dfd.resolve, timeout)
    dfd.promise()

  proxy: (func) ->
    => func.apply(this, arguments)

  constructor: (options) ->
    id = id + 1
    @id = id
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

module.exports = Controller
