class Home extends hw.Controller
  trace: true
  logPrefix: '[HOME]'
  activeClass: hw.options.activeClass
  carrouselClass: hw.options.carrouselClass

  elements: {
    '.hw-sub-container'                   : 'panels'
    'section.hw-services, section.hw-work': 'containers'
    '.hw-sub-close'                       : 'close'
    '.hw-work-carrousel ul'               : 'carrousel'
  }

  events: {
    'click .hw-sub-container' : 'zoom'
    'click .hw-sub-close'     : 'zoomOut'
  }

  constructor: ->
    super
    return unless @el.length
    $('body').on 'click', @cleanAll
    @log 'init'
    @carrousel.hCarrousel {
      className: @carrouselClass
      activeClassName: 'hw-carrousel-active'
    }

  cleanAll: (e) =>
    @log 'clean' if e?
    @panels.removeClass @activeClass

  zoom: (e) ->
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(@activeClass)
    @log 'zoom'
    e.preventDefault()
    e.stopPropagation()
    $papa = $target.closest('section')
    @cleanAll()
    @containers.not($papa).css('z-index', 1)
    $papa.css('z-index', 2)
    $target.addClass @activeClass

  zoomOut: (e) ->
    @log 'zoom out'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $panel = @panels.eq( @close.index($target) )
    @log $panel
    $papa = $panel.closest('section')
    return unless $panel.hasClass @activeClass
    @delay ->
        $papa.css('z-index', 1)
      , 2000
    $panel.removeClass @activeClass
    @cleanAll()

hw.Home = Home
