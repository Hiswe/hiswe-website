jQuery ->
  # console.log hw

  $body       = $('body')
  $panels     = $('.hw-panels-open > dl')
  # remove the dot
  activeClass = hw.options.activeClass

  cleanAll = (e) ->
    $panels.removeClass activeClass

  $panels.on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    console.log $target
    if $target.hasClass activeClass
      return $target.removeClass activeClass
    cleanAll()
    $target.addClass activeClass

  $body.on 'click', cleanAll