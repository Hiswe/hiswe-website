$       = undefined
trace   = false
shared  = require '../../shared/stylus-var'

log = (args...) ->
  return unless trace
  args.unshift("[SETUP]")
  return console?.log?(args...)

setup = ->
  modernizr()
  hammerJs()
  return jQuery()

modernizr = ->
  # Modernizr & test
  # Test should be called before Modernizr
  # https://github.com/jnordberg/browsernizr
  require test for test in require('conf').test
  window.Modernizr  = require 'browsernizr'
  # Can't detect :hover support with Modernizr.hasEvent('mouseover')
  # As iOs will tell yes…

hammerJs = ->
  # Hammerjs
  window.Hammer     = require 'hammerjs'
  # Remove :hover effects on mobile
  # Hammer JS rely on browser sniffing :( But I can't find an easier way
  # https://github.com/mislav/movieapp/blob/master/app/assets/javascripts/touch_nohover.coffee
  if Hammer.IS_MOBILE
    ignore = /:hover\b/
    try
      for stylesheet in document.styleSheets
        idxs = []
        # detect hover rules
        for rule, idx in stylesheet.cssRules
          if rule.type is CSSRule.STYLE_RULE and ignore.test(rule.selectorText)
            idxs.unshift idx

        # delete hover rules
        stylesheet.deleteRule idx for idx in idxs

jQuery = ->
  # Setup jQuery with all the plugins methods attached to it
  $ = window.jQuery = require 'jquery'
  require 'jquery-hammerjs'
  require 'imagesloaded'
  velocity($)
  $

velocity = (jQuery) ->
  require 'velocity-animate'
  # Make a more coffee-friendly velocity function
  # https://github.com/julianshapiro/velocity/issues/76
  jQuery.fn.velocity = (args...) ->
    _velocity = jQuery.velocity or Zepto.velocity or window.velocity
    if args[0].properties?
      propertiesMap = formatColors(args[0].properties)
      options = args[0].options or {}
      return _velocity.animate.call(this, propertiesMap, options)
    _velocity.animate.apply(this, args)

  # Format colors
  formatColors = (propertiesMap) ->
    channel = {r: 'Red', g: 'Green', b: 'Blue'}
    if propertiesMap.color?
      for key, value of shared[propertiesMap.color]
        propertiesMap["color#{channel[key]}"] = value
      delete propertiesMap.color
    if propertiesMap.backgroundColor?
      for key, value of shared[propertiesMap.backgroundColor]
        propertiesMap["backgroundColor#{channel[key]}"] = value
      delete propertiesMap.backgroundColor
    propertiesMap

  # Put some default
  jQuery.Velocity.defaults.duration  = 500
  jQuery.Velocity.defaults.easing    = 'ease'

module.exports = ->
  if $?
    log('Get jQuery instance')
    return $
  log('Setup jQuery & other')

  return setup()
