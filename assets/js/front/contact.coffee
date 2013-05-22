class Contact extends hw.Controller
  trace: true
  logPrefix: '[Contact]'
  activeClass: hw.options.activeClass

  elements: {
    '.hw-sub-container': 'panels'
    'section.hw-services, section.hw-work': 'containers'
  }

  events: {
    'click .hw-sub-container': 'zoom'
    'click': 'cleanAll'
  }

  constructor: ->
    super
    return @log 'INIT ABORT' unless @el.length
    @log 'init'

  cleanAll: (e) ->
    @log 'clean' if e?
    @panels.removeClass @activeClass

  zoom: (e) ->
    @log 'zoom'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $papa = $target.closest('section')
    if $target.hasClass(@activeClass)
      @delay ->
        $papa.css('z-index', 1)
      , 2000
      return $target.removeClass(@activeClass)
    @cleanAll()
    @containers.not($papa).css('z-index', 1)
    $papa.css('z-index', 2)
    $target.addClass @activeClass

hw.Home = Home
