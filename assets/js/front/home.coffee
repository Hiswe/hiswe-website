class Home extends hw.Controller
  trace: true
  logPrefix: '[HOME]'
  activeClass: hw.options.activeClass

  elements: {
    '.hw-sub-container': 'panels'
    'section.hw-services, section.hw-work': 'containers'
  }

  events: {
    'click .hw-sub-container': 'zoom'
  }

  constructor: ->
    super
    return unless @el.length
    $('body').on 'click', @cleanAll
    @log 'init'

  cleanAll: (e) =>
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
