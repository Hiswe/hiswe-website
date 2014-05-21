Controller  = require './front-controller.coffee'
options     = require '../../../config/datas/stylus-var.json'
pubsub      = require './pubsub.coffee'

class ServicesCarrousel extends Controller
  trace: false
  logPrefix: 'CARROUSEL'
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
    super
    return @warn 'No element defined' unless @el.length
    return @warn 'Carrousel already intialized' if @el.hasClass(options.carrouselClass)

    @initCarrousel()
    @loadImages()
    pubsub('resizeEnd').subscribe @resizeEnd
    this

  initCarrousel: ->
    unless Modernizr.csstransforms
      @el.off('tap', '.hw-projects-gallery li')
      return @warn 'No css transform available'

    @log 'Init'
    @el.addClass(options.carrouselClass)
    @li.eq(0)
      .addClass(options.carrouselClassSelected)

    @total        = @li.length
    @galleryWidth = @gallery.width()

    @log 'with', @total, 'image(s)'
    this

  # Images Lazy load
  loadImages: ->
    loadedImages = @initLoading().imagesLoaded()
    loadedImages
      .progress(@onProgress)
      .done( => @log 'all images loaded')

    if Modernizr.progressbar
      @initProgress()
      loadedImages.progress( @updateProgress )

    this

  initLoading: ->
    @log 'Init loading'
    @images.each @loadImage
    @refreshElements()
    return @images

  onProgress: (instance, image) =>
    @log 'on progress'
    $( image.img )
      .addClass(options.carrouselImageLoaded)
      .css('opacity', '')
      .parent()
      .removeClass('hw-projects-lazyload-loading')

  loadImage: (index, image) =>
    $original = $(image).css('opacity', 0)
    $parent   = $original.parent().addClass('hw-projects-lazyload-loading')
    $img      = $original.clone()
    # imgSrc = if @pixelRatio is 1 then img.data('original') else img.data('retina')
    imgSrc = $img.data('original')
    $img.attr 'src', imgSrc
    $original.replaceWith($img)
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
  resizeEnd: =>
    @galleryWidth = @gallery.width()
    @moveTo @li.eq(@count)
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

  moveTo: (selectedImage) ->
    currentTransform = selectedImage.position().left * - 1

    if @count is 0
      # First goes to the carrousel's left
      adjustedTransform = currentTransform
    else if @count is @total - 1
      # Last goes to the carrousel's right
      adjustedTransform = currentTransform + @galleryWidth - selectedImage.width()
    else
      # 5% margin for controls
      adjustedTransform = currentTransform + (@galleryWidth * 0.05)

    @list.css({
      transform: "translate3d(#{adjustedTransform}px, 0px, 0px)"
    })
    this

  circle: (event) ->
    @log 'circle'
    # Don't prevent things, as the zoom link would be disabled
    # event.preventDefault()
    # event.stopImmediatePropagation()

    el = @getNodes(event)

    return if el.$next.hasClass(options.carrouselClassSelected)

    el.$current.removeClass(options.carrouselClassSelected)
    el.$next.addClass(options.carrouselClassSelected)

    @moveTo(el.$next)

    this


module.exports = ServicesCarrousel
