class Contact extends hw.Controller
  trace: true
  logPrefix: '[CONTACT]'
  removeDelay: 10000

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
    $target.on('animationend', ->$(this).remove()).addClass('remove')

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
    msg = ['<p class="hw-message-success">', res.message, '</p>']
    $msg = $(msg.join('')).prependTo(@el)
    @timer = window.setTimeout(
      => @discardMessage({currentTarget: $msg})
    , @removeDelay)

  error: (res) =>
    @log 'error', res.responseText
    msg = ['<p class="hw-message-error">', res.responseText, '</p>']
    @el.prepend $(msg.join(''))

  always: (res) =>
    @log 'always'
    @refreshElements()
    @all.attr('disabled', false)

hw.Contact = Contact
