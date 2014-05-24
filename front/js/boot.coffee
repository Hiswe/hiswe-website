$       = require('./setup')

App     = require './app'
pubsub  = require './pubsub'

jQuery ->
  window.app = new App({el: jQuery('html')})

  # Global resize timer
  resizeTimer = null

  jQuery(window).on 'resize', ->
    pubsub('resizeStart').publish() unless resizeTimer
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout ->
      pubsub('resizeEnd').publish()
      resizeTimer = null
    , 300

  jQuery('body').hammer().on 'tap', -> pubsub('body').publish('tap')



