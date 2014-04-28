Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'

class ServicesCarrousel extends Controller
  trace: true
  logPrefix: '[CARROUSEL]'
  count: 0
  total: 0
  galleryWidth: null

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
    # We can't run it without css transforms
    return @warn 'No css transform available' unless Modernizr.csstransforms
    super
    return @warn 'No element defined' unless @el.length
    return @warn 'Carrousel already intialized' if @el.hasClass(options.carrouselClass)

    @init()
    this

  init: ->
    @log 'Init'

    @el.addClass(options.carrouselClass)
    @li.eq(0)
      .addClass(options.carrouselClassSelected)

    @total        = @li.length
    @galleryWidth = @gallery.width()

    @log 'with', @total, 'image(s)'

    loadedImages = @initLoading().imagesLoaded()
    loadedImages
      .progress(@onProgress)
      .done( => @log 'all images loaded')

    if Modernizr.progressbar
      @initProgress()
      loadedImages.progress( @updateProgress )

    this

  # Images Lazy load
  initLoading: ->
    @log 'Init loading'
    @images.each @loadImage
    return @images

  onProgress: (instance, image) =>
    @log 'on progress'
    $( image.img )
      .css('opacity', '')
      .parent()
      .removeClass('hw-projects-lazyload-loading')

  loadImage: (index, image) =>
    $img = $(image).css('opacity', 0)
    $parent = $img.parent().addClass('hw-projects-lazyload-loading')
    # imgSrc = if @pixelRatio is 1 then img.data('original') else img.data('retina')
    imgSrc = $img.data('original')
    $img.attr 'src', imgSrc
    this

  initProgress: ->
    @log 'Init progress bar'
    @progressCurrent  = 0
    @total    = @li.length
    progressMarkup = '<progress class="bg-projects-progress" value="0"  max="'
    progressMarkup += @total + '"></progress>'
    @progressBar = $(progressMarkup).appendTo(@el)

  updateProgress: =>
    @log 'update progress bar'
    @progressCurrent += 1
    @progressBar.attr('value', @progressCurrent)
    @progressBar.remove() if @progressCurrent is @total

  # Carrousel
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

    if @count is 0
      # First goes to the carrousel's left
      adjustedTransform = currentTransform
    else if @count is @total - 1
      # Last goes to the carrousel's right
      adjustedTransform = currentTransform + @galleryWidth - el.$next.width()
    else
      # 5% margin for controls
      adjustedTransform = currentTransform + (@galleryWidth * 0.05)

    @list.css({
      transform: "translate3d(#{adjustedTransform}px, 0px, 0px)"
    })
    this


module.exports = ServicesCarrousel
