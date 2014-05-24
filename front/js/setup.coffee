$     = undefined
trace = false

log = (args...) ->
  return unless trace
  args.unshift("[SETUP]")
  return console?.log?(args...)

# Setup a clean jQuery with all the plugins methods attached to it
# So we don't have to require everything everythime 
setup = ->
  $ = window.jQuery = require 'jquery'
  window.Hammer     = require 'hammerjs' 

  require 'jquery-hammerjs'
  require 'hevent'
  ImagesLoaded = require('imagesloaded')
  # Fix imagesloaded bad behavior due to 
  # https://github.com/desandro/imagesloaded/issues/148
  $.fn.imagesLoaded  = ( options, callback )  ->
    instance = new ImagesLoaded( this, options, callback )
    instance.jqDeferred = new $.Deferred()
    return instance.jqDeferred.promise( $(this) )

  return $

module.exports = ->
  if $?
    log('Get jQuery instance') 
    return $ 
  log('Setup jQuery & other') 
  return setup() 
