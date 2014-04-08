whichTransitionEvent = ->
  transEndEventNames = {
    'transition'      :'transitionend'
    'msTransition'    :'MSTransitionEnd'
    'OTransition'     :'oTransitionEnd'
    'MozTransition'   :'transitionend'
    'WebkitTransition':'webkitTransitionEnd'
  }

  return transEndEventNames[ Modernizr.prefixed('transition') ]


whichAnimationEvent = ->
  animationEndEventNames = {
    'animation'       :'animationend'
    'msAnimation'     :'MSAnimationEnd'
    'OAnimation'      :'oAnimationEnd'
    'MozAnimation'    :'animationend'
    'WebkitAnimation' :'webkitAnimationEnd'
  }

  return animationEndEventNames[ Modernizr.prefixed('animation') ]

exports.transition  = whichTransitionEvent()
exports.animation   = whichAnimationEvent()
