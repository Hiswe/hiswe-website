exports.uslug = {
  lower: true,
  allowedChars: '-'
};

exports.datas = 'config/datas';

exports.jsonDb = __dirname + '/config/datas/db-work.json';

exports.revFiles = [
  'public/*min.js',
  'public/*.min.css'
];

exports.pack = [
  './package.json',
  './bower.json'
];

exports.lib = {
  src: [
    'bower_components/modernizr/modernizr.js', // used by js
    'bower_components/pointerevents-polyfill/pointerevents.dev.js',
    'bower_components/PointerGestures/pointergestures.min.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery.transit/jquery.transit.js',
    'bower_components/jquery-pointer-events/src/pointer.js',
    'bower_components/hevent/build/jquery.hevent.js'
  ],
  dst: 'public',
  srcMap: 'bower_components/PointerGestures/pointergestures.js.map',
  clean: 'public/lib*.js'
};

exports.front = {
  basedir: __dirname + '/assets/js/front',
  clean: 'public/app*js',
  dst: 'public'
};

exports.font = [
  'bower_components/hiso-font/font/**',
  '!bower_components/hiso-font/font/*.css'
];

var imgSrc = 'public/media/source/';
var imgDst = 'public/media/images/';

exports.img = {
  pixel:      [imgSrc + '*.{jpg,jpeg,png}', '!' + imgSrc + 'splash*.{jpg,jpeg,png}'],
  cleanPixel: [imgDst + '*.{jpg,jpeg,png}', '!' + imgDst + 'splash*.{jpg,jpeg,png}'],
  splash:     imgSrc + 'splash*.{jpg,jpeg,png}',
  cleanSplash:imgDst + 'splash*.{jpg,jpeg,png}',
  svg:        imgSrc + '*.svg',
  cleanSvg:   imgDst + '*.svg',
  dst:        imgDst,
  fullDst:    __dirname + '/' + imgDst
};

exports.serverSrc = 'media/images/';

exports.cssImport = [
  '../../../bower_components/hiso-font/font/hiso-font.css',
  '../../../bower_components/hiso-font/font/hicon.css'
];
