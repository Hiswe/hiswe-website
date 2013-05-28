class Contact extends hw.Controller
  trace: false
  logPrefix: '[CONTACT]'

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
    @log 'discard with animation?', Modernizr.cssanimations
    $target = $(e.currentTarget)
    return $target.remove() unless Modernizr.cssanimations
    $target.addClass('remove').on hw.animationEnd, ->
      $(this).remove()


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
    @log 'success', res.responseText
    msg = ['<p class="hw-message-success">', res.responseText, '</p>']
    @el.prepend $(msg.join(''))

  error: (res) =>
    @log 'error', res.responseText
    msg = ['<p class="hw-message-error">', res.responseText, '</p>']
    @el.prepend $(msg.join(''))

  always: (res) =>
    @log 'always'
    @refreshElements()
    @all.attr('disabled', false)

hw.Contact = Contact
