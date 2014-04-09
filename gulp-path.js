module.exports = {
  datas: 'config/datas',
  jsonDb: __dirname + '/config/datas/db-work.json',
  revFiles: [
    'public/*min.js',
    'public/*.min.css'
  ],
  libs: [
    'bower_components/modernizr/modernizr.js', // used by js
    'bower_components/jquery/dist/jquery.js',
    'bower_components/hevent/build/jquery.hevent.js'
  ],
  frontAppBasedir: __dirname + '/assets/js/front',
  font: [
    'bower_components/hiso-font/font/**',
    '!bower_components/hiso-font/font/*.css'
  ],
  imgSrc: [
    'public/media/source/*',
    '!public/media/source/*.svg'
  ],
  svgSrc: 'public/media/source/*.svg',
  imgDst: 'public/media/images/',
  serverSrc: 'media/images/',
  cssImport: [
    '../../../bower_components/hiso-font/font/hiso-font.css',
    '../../../bower_components/hiso-font/font/hicon.css'
  ]
};