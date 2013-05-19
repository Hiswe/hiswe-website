jQuery ->
  $body       = $('body')
  $panels     = $('.hw-sub-container')
  $containers = $('section.hw-services, section.hw-work')
  activeClass = hw.options.activeClass

  cleanAll = (e) ->
    $panels.removeClass activeClass

  $panels.on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $papa = $target.closest('section')
    if $target.hasClass(activeClass)
      setTimeout ->
        $papa.css('z-index', 1)
      , 2000
      return $target.removeClass(activeClass)
    cleanAll()
    # setTimeout ->
    #   $containers.filter('.hw-highlight').re
    $containers.not($papa).css('z-index', 1)
    $papa.css('z-index', 2)
    $target.addClass activeClass

  $body.on 'click', cleanAll
