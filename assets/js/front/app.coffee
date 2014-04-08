Controller  = require './front-controller.coffee'
Home        = require './home.coffee'
Contact     = require './contact.coffee'


class App extends Controller
  trace: false
  logPrefix: '[APP]'

  constructor: ->
    @log 'init'
    $('body').removeClass('preload')
    @home = new Home({el: $('div.hw-detail-panels')})
    @contact = new Contact({el: $('form.hw-contact-form')})
    this

module.exports = App
