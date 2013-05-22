class App extends hw.Controller
  trace: true
  logPrefix: '[APP]'

  constructor: ->
    @log 'init'
    @home = new hw.Home({el: $('div.hw-detail-panels')})
    @contact = new hw.Contact({el: $('form.hw-contact-form')})

hw.App = App
