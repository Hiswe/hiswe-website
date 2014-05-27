$     = undefined
trace = false

log = (args...) ->
  return unless trace
  args.unshift("[SETUP]")
  return console?.log?(args...)

setup = ->
  # Modernizr & test
  # Test should be called before Modernizr
  # https://github.com/jnordberg/browsernizr
  require test for test in require('conf').test
  window.Modernizr  = require 'browsernizr'
  # Hammerjs
  window.Hammer     = require 'hammerjs'
  # Setup jQuery with all the plugins methods attached to it
  $ = window.jQuery = require 'jquery'
  require 'jquery-hammerjs'
  require 'hevent'
  require 'velocity-animate'
  require 'imagesloaded'
  # Make a more coffee-friendly velocity function
  # https://github.com/julianshapiro/velocity/issues/76
  jQuery.fn.velocity = (args...) ->
    dfd = new $.Deferred()
    _velocity = jQuery.velocity or Zepto.velocity or window.velocity
    if args[0].properties?
      propertiesMap = args[0].properties
      options = args[0].options or {}
      options.complete = dfd.resolve
      _velocity.animate.call(this, propertiesMap, options)
    else
      if args[1]?
        args[1].complete = dfd.resolve
      else
        args.push {complete: dfd.resolve}

      _velocity.animate.apply(this, args)
    dfd.promise()

  return $

module.exports = ->
  if $?
    log('Get jQuery instance')
    return $
  log('Setup jQuery & other')

  return setup()
