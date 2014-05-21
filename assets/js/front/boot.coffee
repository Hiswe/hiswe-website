App     = require './app.coffee'
pubsub  = require './pubsub.coffee'

jQuery ->
  window.app = new App({el: $('html')})

  # Global resize timer
  resizeTimer = null

  $(window).on 'resize', ->
    pubsub('resizeStart').publish() unless resizeTimer
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout ->
      pubsub('resizeEnd').publish()
      resizeTimer = null
    , 300

  $('body').on 'tap', -> pubsub('body').publish('tap')



