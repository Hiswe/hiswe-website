Controller  = require './front-controller.coffee'
Services    = require './services.coffee'
Projects    = require './projects.coffee'
Contact     = require './contact.coffee'
options     = require '../../../config/datas/stylus-var.json'

class App extends Controller
  trace: false
  logPrefix: '[APP]'
  elements: {
    'body' : 'body'
  }

  constructor: ->
    super
    @log 'init'
    @body.removeClass('prevent-transition')
    @getPixelRatio()
    @instanciate()
    @bodyEvents()
    this

    Controller.e.on 'resizeStart', => @body.addClass 'prevent-transition'
    Controller.e.on 'resizeEnd', => @body.removeClass 'prevent-transition'

  instanciate: ->
    @services = new Services({el: $('section.hw-services')})
    @projects = new Projects({el: $('section.hw-projects')})
    @contact  = new Contact({el: $('form.hw-contact-form')})

  bodyEvents: ->
    @body.on 'tap', =>
      @log 'body click'
      @services.e.trigger 'clean'

    @projects.e.on('open', =>
      @log('projects open')
      @body.addClass options.activeBody
    )
    @projects.e.on('close', =>
      @log('projects close')
      @body.removeClass options.activeBody
    )

  getPixelRatio: ->
    pixelRatio = if window.devicePixelRatio? then window.devicePixelRatio else 1
    Controller::pixelRatio = pixelRatio

module.exports = App
