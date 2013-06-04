class Home extends hw.Controller
  trace: true
  logPrefix: '[HOME]'
  activeClass: hw.options.activeClass
  carrouselClass: hw.options.carrouselClass
  timer: undefined

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
    @log 'Init'
    $('body').on 'click', @cleanAll
    @initCarrousel()
    this

  initCarrousel: (data) =>
    @log 'Init carrousel'
    @carrousel.each (index, el) =>
      $el = $(el)
      $template = $ @template
      $template.appendTo($el.closest('.hw-sub-panel'))
      $prev = $template.find('button').eq(0)
      $next = $template.find('button').eq(1)
      $el.hCarrousel({
        className: @carrouselClass
        activeClassName: 'hw-carrousel-active'
        debug: @trace
        prevButton: $prev
        nextButton: $next
      })
    this

  # Don't need a template engine for this
  template: (->
    tmpl = ['<menu class="hw-carrousel-navigation">']
    tmpl = tmpl.concat ['<button class="hw-carrousel-prev">', '</button>']
    tmpl = tmpl.concat ['<button class="hw-carrousel-next">', '</button>']
    tmpl = tmpl.concat ['</menu>']
    tmpl.join('')
  )()

  cleanAll: (e) =>
    @log 'clean' if e?
    @panels.removeClass @activeClass
    this

  zoom: (e) ->
    $target = $(e.currentTarget)
    e.stopPropagation()
    return if $target.hasClass(@activeClass)
    window.clearTimeout @timer
    @log 'Zoom'
    e.preventDefault()
    e.stopPropagation()
    $papa = $target.closest('section')
    @log $papa
    @cleanAll()
    @containers.not($papa).css('z-index', 1)
    $papa.css('z-index', 2)
    $target.addClass @activeClass
    this

  zoomOut: (e) ->
    @log 'Zoom out'
    e.preventDefault()
    e.stopPropagation()
    $target = $(e.currentTarget)
    $panel = @panels.eq( @close.index($target) )
    return unless $panel.hasClass @activeClass
    $papa = $panel.closest('section')
    @timer = @delay ->
        $papa.css('z-index', 1)
      , 2000
    $panel.removeClass @activeClass
    @cleanAll()
    this

hw.Home = Home
