class Contact extends hw.Controller
  trace: true
  logPrefix: '[CONTACT]'

  elements: {
  }

  events: {
  }

  constructor: ->
    super
    return unless @el.length
    @log 'init'

hw.Contact = Contact
