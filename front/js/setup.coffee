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
  jQuery.fn.velocity = ->
    _velocity = jQuery.velocity or Zepto.velocity or window.velocity
    if arguments[0].properties?
      propertiesMap = arguments[0].properties
      options = arguments[0].options
      _velocity.animate.call(this, propertiesMap, options)
    else
      _velocity.animate.apply(this, arguments)

  return $

module.exports = ->
  if $?
    log('Get jQuery instance')
    return $
  log('Setup jQuery & other')

  return setup()
