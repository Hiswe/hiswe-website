Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class ServicesCarrousel extends Controller
  trace: true
  logPrefix: '[CARROUSEL]'
  count: 0
  galleryWidth: null

  events: {
    'tap .hw-projects-gallery li': 'circle'
  }

  elements: {
    '.hw-projects-gallery':     'gallery'
    'ul':                       'list'
    '.hw-projects-gallery li':  'li'
  }

  constructor: ->
    # We can't run it without css transforms
    return @warn 'No css transform available' unless Modernizr.csstransforms
    super
    return @warn 'No element defined' unless @el.length
    @log 'Init'
    @el.data('carrousel', true)
    @el.addClass(options.carrouselClass)
    @galleryWidth = @gallery.width()
    @li.eq(0).addClass(options.carrouselClassSelected)
    this

  getNodes: (event) ->
    $current      = @li.eq(@count)
    $next         = $(event.currentTarget)

    nextNodeIndex = @li.index($next)

    @log 'move from', @count, 'to', nextNodeIndex
    @count = nextNodeIndex

    return {
      $current: $current
      $next: $next
    }

  circle: (event) ->
    @log 'circle'
    event.preventDefault()
    event.stopImmediatePropagation()

    el = @getNodes(event)

    return if el.$next.hasClass(options.carrouselClassSelected)

    el.$current.removeClass(options.carrouselClassSelected)
    el.$next.addClass(options.carrouselClassSelected)

    currentTransform = el.$next.position().left * - 1

    # 10% margin unless first element
    adjustedTransform = if @count is 0 then currentTransform else currentTransform + (@galleryWidth * 0.1)

    @list.css({
      transform: "translate3d(#{adjustedTransform}px, 0px, 0px)"
    })
    this


module.exports = ServicesCarrousel
