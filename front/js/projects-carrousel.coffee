$           = require 'jquery'
Controller  = require './front-controller'
shared      = require '../../shared/stylus-var'
pubsub      = require './pubsub'

class ServicesCarrousel extends Controller
  trace: false
  logPrefix: 'CARROUSEL'
  count: 0
  total: 0
  galleryWidth: null

  events: {
    'tap .hw-projects-gallery ul': 'next'
  }
  # swipeleft
  # swiperight

  elements: {
    '.hw-projects-gallery':     'gallery'
    'ul':                       'list'
    '.hw-projects-gallery li':  'li'
    '.hw-projects-gallery img': 'images'
  }

  constructor: ->
    super
    return @warn 'No element defined' unless @el.length
    return @warn 'Carrousel already intialized' if @el.hasClass(shared.carrouselClass)

    @initCarrousel()
    @loadImages()
    pubsub('resizeEnd').subscribe @resizeEnd
    this

  initCarrousel: ->
    unless Modernizr.csstransforms
      @el.off('tap', '.hw-projects-gallery li')
      return @warn 'No css transform available'

    @log 'Init'
    @el.addClass(shared.carrouselClass)
    @li.eq(0)
      .addClass(shared.carrouselClassSelected)

    @total        = @li.length
    @galleryWidth = @gallery.width()

    @log 'with', @total, 'image(s)'
    this

  ###########
  # Lazy load
  ###########
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
      .addClass(shared.carrouselImageLoaded)
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

  ###########
  # Carrousel
  ###########

  resizeEnd: =>
    @galleryWidth = @gallery.width()
    @moveTo @li.eq(@count)
    this

  next: ->
    @moveTo 'left'

  prev: ->
    @moveTo 'right'

  moveTo: (direction = 'left') ->
    $current      = @li.eq(@count)
    $currentImage = @images.eq(@count)
    currentEnd    = new $.Deferred()

    nextIndex     = if direction is 'left' then @count + 1 else @count - 1
    nextIndex     = if @total > nextIndex then nextIndex else 0
    $next         = @li.eq(nextIndex)
    $nextImage    = @images.eq(nextIndex)
    @count        = nextIndex
    nextEnd       = new $.Deferred()

    # current
    $current.velocity
      properties:
        opacity: [0, 1]
      options:
        complete: currentEnd.resolve

    $currentImage.velocity
      properties:
        translateZ: [0, 0]
        rotateY: [90, 0]

    # next
    $next.velocity
      properties:
        opacity: [1, 0]
      options:
        display: 'block'
        delay: 150
        complete: nextEnd.resolve

    $nextImage.velocity
      properties:
        translateZ: [0, 0]
        rotateY: [0, -90]
      options:
        delay: 150

    $.when currentEnd, nextEnd
      .done =>
        $current
            .removeClass shared.carrouselClassSelected
            .removeAttr 'style'
        $next
          .addClass shared.carrouselClassSelected
          .removeAttr 'style'

    this


module.exports = ServicesCarrousel
