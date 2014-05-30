$       = undefined
trace   = false
shared  = require '../../shared/stylus-var'

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
  require 'imagesloaded'
  velocity($)

  return $

velocity = ($) ->
  require 'velocity-animate'
  # Make a more coffee-friendly velocity function
  # https://github.com/julianshapiro/velocity/issues/76
  jQuery.fn.velocity = (args...) ->
    _velocity = jQuery.velocity or Zepto.velocity or window.velocity
    if args[0].properties?
      propertiesMap = args[0].properties
      options = args[0].options or {}
      return _velocity.animate.call(this, propertiesMap, options)
    _velocity.animate.apply(this, args)


  # Setup some sequence
  $.Velocity.Sequences.openCover = (element, options) ->
    properties = {
      height: '150%'
      top: '-25%'
      skewY: [0, options.skew]
      backgroundColorRed:   shared['$dark-gray'].r
      backgroundColorGreen: shared['$dark-gray'].g
      backgroundColorBlue:  shared['$dark-gray'].b
    }
    opts = {
      duration: 500
      easing: "ease"
      complete: options.complete
    }

    $.Velocity.animate element, properties, opts

module.exports = ->
  if $?
    log('Get jQuery instance')
    return $
  log('Setup jQuery & other')

  return setup()
