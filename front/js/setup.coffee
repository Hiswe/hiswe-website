$     = undefined
trace = false

log = (args...) ->
  return unless trace
  args.unshift("[SETUP]")
  return console?.log?(args...)

setup = ->
  require test for test in require('conf').test
  window.Modernizr  = require 'browsernizr'

  window.Hammer     = require 'hammerjs'
  # Setup jQuery with all the plugins methods attached to it
  $ = window.jQuery = require 'jquery'

  require 'jquery-hammerjs'
  require 'hevent'
  require 'velocity-animate'
  require 'imagesloaded'

  return $

module.exports = ->
  if $?
    log('Get jQuery instance')
    return $
  log('Setup jQuery & other')

  return setup()
