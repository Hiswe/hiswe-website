$           = require 'jquery'
Controller  = require './front-controller'
shared      = require '../../shared/stylus-var'
pubsub      = require './pubsub'
prevTmpl    = require '../../views/includes/gallery-prev'
nextTmpl    = require '../../views/includes/gallery-next'

class ServicesCarrousel extends Controller
  trace: false
  logPrefix: 'CARROUSEL'
  count: 0
  total: 0

  events: {
    'tap':        'next'
    'swiperight': 'next'
    'swipeleft':  'prev'
    'tap hw-projects-gallery-control-next' : 'next'
    'tap hw-projects-gallery-control-prev' : 'prev'
    'tap li a':    'prevent'
  }

  elements: {
    '.hw-projects-gallery': 'gallery'
    'ul':                   'list'
    'li':                   'li'
    'img':                  'images'
  }

  constructor: ->
    super
    return @warn 'No element defined' unless @el.length
    return @warn 'Carrousel already intialized' if @el.hasClass(shared.carrouselClass)

    @initCarrousel()
    @loadImages()
    this

  initCarrousel: ->

    @log 'Init'
    @el.addClass(shared.carrouselClass)
    @li.eq(0)
      .addClass(shared.carrouselClassSelected)

    @total = @li.length

    @log 'with', @total, 'image(s)'
    this

  prevent: (event) ->
    @log 'prevent'
    event.stopPropagation()
    event.gesture.stopPropagation()
    false

  ###########
  # Lazy load
  ###########

  loadImages: ->
    loadedImages = @initLoading().imagesLoaded()
    loadedImages
      .progress @onProgress
      .done @onEnd


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

  onEnd: =>
    @log 'all images loaded'
    @gallery.prepend prevTmpl()
      .append nextTmpl()

  ###########
  # Carrousel
  ###########

  next: ->
    @moveTo 'left'

  prev: ->
    @moveTo 'right'

  moveTo: (direction = 'left') ->
    direction     = if direction is 'left' then 1 else -1

    $current      = @li.eq(@count)
    $currentImage = @images.eq(@count)
    currentEnd    = new $.Deferred()

    nextIndex     = @count + direction
    nextIndex     = if @total > nextIndex then nextIndex else 0
    nextIndex     = if nextIndex < 0 then @total - 1 else nextIndex
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
        rotateY: [direction * 90, 0]

    # next
    $next.velocity
      properties:
        opacity: [1, 0]
      options:
        display: 'block'
        # delay: 150
        complete: nextEnd.resolve

    $nextImage.css 'opacity', 0
    $nextImage.velocity
      properties:
        translateZ: [0, 0]
        rotateY: [0, direction * -90]
        opacity: [1, 0]
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
