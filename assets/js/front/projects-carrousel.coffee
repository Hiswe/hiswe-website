Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class ServicesCarrousel extends Controller
  trace: true
  logPrefix: '[CARROUSEL]'
  count: 0
  galleryWidth: null
  currentTransform: 0

  events: {
    'tap .hw-projects-gallery li': 'circle'
  }

  elements: {
    '.hw-projects-gallery':     'gallery'
    'ul':                       'list'
    '.hw-projects-gallery li':  'li'
    '.hw-projects-gallery img': 'images'
  }

  constructor: ->
    super
    return unless @el.length
    @log 'Init'
    @el.data('carrousel', true)
    @el.addClass(options.carrouselClass)
    @galleryWidth = @gallery.width()
    # @ul.transition({transform: "translate3d(0px, 0px, 0px)"}
    @li.eq(0).addClass(options.carrouselClassSelected)
    this

  getNodesAndDirection: (event) ->
    $current      = @li.eq(@count)
    $next         = $(event.currentTarget)

    nextNodeIndex = @li.index($next)

    sign = if nextNodeIndex > @count then 1 else -1
    @log 'move from', @count, 'to', nextNodeIndex
    @count = nextNodeIndex

    {
      $current: $current
      $next: $next
      sign: sign
    }

  circle: (event) ->
    @log 'circle'
    event.preventDefault()
    event.stopImmediatePropagation()

    infos = @getNodesAndDirection(event)

    return if infos.$next.hasClass(options.carrouselClassSelected)

    infos.$current.removeClass(options.carrouselClassSelected)

    $currentWidth     = infos.$current.width()
    @currentTransform = @currentTransform - ($currentWidth * infos.sign)

    # 10% margin unless first element
    adjustedTransform = if @count is 0 then @currentTransform else @currentTransform + (@galleryWidth * 0.1)

    @list.transition({
      x: adjustedTransform
    }, ->
      infos.$next.addClass(options.carrouselClassSelected)
    )


module.exports = ServicesCarrousel
