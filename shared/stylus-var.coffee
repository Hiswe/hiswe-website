parse   = require('color-parser')

conf = {
  # classes
  'activeClass'             : 'hw-panel-active'
  'witness'                 : 'hw-witness'
  'activeWitness'           : 'hw-witness-active'
  'activeBody'              : 'hw-body-active'
  'carrouselClass'          : 'hw-carrousel'
  'carrouselImageLoaded'    : 'hw-carrousel-image-loaded'
  'carrouselClassSelected'  : 'hw-carrousel-selected'
  'projectCoverLoad'        : 'hw-projects-cover-lazyload'
  'projectContentLoading'   : 'hw-projects-content-loading'
  # size
  'desktopWidth'            : 1080
  'tabletWidth'             : 768
  'mobileWidth'             : 480
  'carrouselHeight'         : 552
  # colors
  '$light-pink'             : parse '#ff74b9'
  '$pink'                   : parse '#ff0078'
  '$dark-pink'              : parse '#7a0037'
  '$light-blue'             : parse '#2db6e9'
  '$blue'                   : parse '#009ae1'
  '$dark-blue'              : parse '#008edc'
  '$light-gray'             : parse '#ecf4f8'
  '$gray'                   : parse '#cddce4'
  '$dark-gray'              : parse '#576176'
  '$darkest-gray'           : parse '#454A5D'
  '$black'                  : parse '#445'
  '$white'                  : parse '#fff'
}

conf['$light-grey']         = conf['$light-gray']
conf['$grey']               = conf['$gray']
conf['$dark-grey']          = conf['$dark-gray']
conf['$darkest-grey']       = conf['$darkest-gray']

module.exports = conf
