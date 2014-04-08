Controller  = require './front-controller.coffee'
Services    = require './services.coffee'
Projects    = require './projects.coffee'
Contact     = require './contact.coffee'

class App extends Controller
  trace: false
  logPrefix: '[APP]'

  constructor: ->
    @log 'init'
    # TODO handle all body behavior here
    $('body').removeClass('preload')
    @services = new Services({el: $('section.hw-services')})
    @projects = new Projects({el: $('section.hw-projects')})
    @contact  = new Contact({el: $('form.hw-contact-form')})
    this

module.exports = App
