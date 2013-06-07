class App extends hw.Controller
  trace: false
  logPrefix: '[APP]'

  constructor: ->
    @log 'init'
    $('body').removeClass('preload')
    @home = new hw.Home({el: $('div.hw-detail-panels')})
    @contact = new hw.Contact({el: $('form.hw-contact-form')})
    this

hw.App = App
