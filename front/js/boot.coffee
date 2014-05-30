$       = require('./setup')()

App     = require './app'
pubsub  = require './pubsub'

$ ->
  window.app = new App({el: $('html')})

  # Global resize timer
  resizeTimer = null

  $window = $(window)

  $window.on 'resize', ->
    pubsub('resizeStart').publish() unless resizeTimer
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout ->
      pubsub('resizeEnd').publish $window.width()
      resizeTimer = null
    , 300

  $('body').hammer().on 'tap', -> pubsub('body').publish('tap')



