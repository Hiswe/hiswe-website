Controller  = require './front-controller.coffee'
events      = require './events.coffee'

class Contact extends Controller
  trace: false
  logPrefix: '[CONTACT]'
  removeDelay: 5000

  elements: {
    'input, textarea, button': 'all'
  }

  events: {
    'submit': 'submit'
    'click p': 'discardMessage'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'init'

  discardMessage: (e) ->
    @log 'discard'
    $target = $(e.currentTarget)
    window.clearTimeout @timer
    $target.on(events.animation, ->$(this).remove()).addClass('remove')

  addMessage: (type = 'success', text = 'send') ->
    msg = ['<p class="hw-message-', type, '">', text, '</p>']
    $msg = $(msg.join('')).prependTo(@el)
    @timer = window.setTimeout(
      => @discardMessage({currentTarget: $msg})
    , @removeDelay)
    this

  submit: (e) ->
    @log 'submit'
    e.preventDefault()
    data = {}
    $.each @el.serializeArray(), (index, item) ->
      data[item.name] = item.value

    @all.attr('disabled', true)
    $.post( '/contact', data)
    .done(@success)
    .fail(@error)
    .always(@always)

  success: (res) =>
    @log 'success', res
    @addMessage('success', res.message)

  error: (res) =>
    @log 'error', res.responseText
    @addMessage('error', res.responseText)

  always: (res) =>
    @log 'always'
    @refreshElements()
    @all.attr('disabled', false)

module.exports = Contact
