#= require front-controller
#= require home
#= require contact
#= require app

whichTransitionEvent = ->
  transEndEventNames = {
    'transition':'transitionend'
    'msTransition':'MSTransitionEnd'
    'OTransition':'oTransitionEnd'
    'MozTransition':'transitionend'
    'WebkitTransition':'webkitTransitionEnd'
  }

  return transEndEventNames[ Modernizr.prefixed('transition') ];


whichAnimationEvent = ->
  animationEndEventNames = {
    'animation':'animationend'
    'msAnimation':'MSAnimationEnd'
    'OAnimation':'oAnimationEnd'
    'MozAnimation':'animationend'
    'WebkitAnimation':'webkitAnimationEnd'
  }

  return animationEndEventNames[ Modernizr.prefixed('animation') ];

jQuery ->
  hw.transition   = whichTransitionEvent()
  hw.animationEnd = whichAnimationEvent()
  hw.app = new hw.App({el: $('html')})
