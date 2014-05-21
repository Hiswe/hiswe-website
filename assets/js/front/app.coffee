Controller  = require './front-controller.coffee'
Services    = require './services.coffee'
Projects    = require './projects.coffee'
Contact     = require './contact.coffee'
pubsub      = require './pubsub.coffee'
options     = require '../../../config/datas/stylus-var.json'

class App extends Controller
  trace: false
  logPrefix: 'APP'
  elements: {
    'body'                : 'body'
    'section.hw-services' : 'servicesContainer'
  }

  constructor: ->
    super
    @log 'init'
    @body.removeClass('prevent-transition')
    @getPixelRatio()
    @instanciate()
    @bodyEvents()
    this

    pubsub('resizeStart').subscribe => @body.addClass('prevent-transition')
    pubsub('resizeEnd').subscribe => @body.removeClass('prevent-transition')

  instanciate: ->
    @services = new Services({el: @servicesContainer})
    @projects = new Projects({el: $('section.hw-projects')})
    @contact  = new Contact({el: $('form.hw-contact-form')})

  bodyEvents: ->
    @body.on 'tap', =>
      @log 'body click'
      @services.e?.trigger 'clean'

    pubsub('projects').subscribe (event) =>
      if event is 'openStart'
        @log('projects open')
        @body.css('overflow', 'hidden')

      if event is 'closeEnd'
        @log('projects close')
        @body.css('overflow', 'auto')

  getPixelRatio: ->
    pixelRatio = if window.devicePixelRatio? then window.devicePixelRatio else 1
    Controller::pixelRatio = pixelRatio

module.exports = App
