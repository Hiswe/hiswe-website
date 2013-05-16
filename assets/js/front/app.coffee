jQuery ->
  $body       = $('body')
  $panels     = $('.hw-services .pages > *, .hw-work .pages > *')
  activeClass = 'hw-panel-active'

  cleanAll = (e) ->
    console.log('cleanAll') if e?
    $panels.removeClass activeClass

  $panels.on 'click', (e) ->
    console.log 'panel click'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    console.log $target
    if $target.hasClass activeClass
      return $target.removeClass activeClass
    cleanAll()
    $target.addClass activeClass

  $body.on 'click', cleanAll