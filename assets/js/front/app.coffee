jQuery ->
  $body       = $('body')
  $panels     = $('.hw-sub-container')
  $containers = $('section.hw-services, section.hw-work')
  activeClass = hw.options.activeClass

  cleanAll = (e) ->
    $panels.removeClass activeClass
    # setTimeout ->
    $containers.css('z-index', 1)
    # , 2000

  $panels.on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    cleanAll()
    $target.closest('section').css('z-index', 2)
    $target.addClass activeClass

  $body.on 'click', cleanAll
