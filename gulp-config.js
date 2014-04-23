sharedVar = require('./config/datas/stylus-var.json');

exports.uslug = {
  lower: true,
  allowedChars: '-'
};

exports.datas = 'config/datas';

exports.jsonDb = __dirname + '/config/datas/db-work.json';

exports.revFiles = [
  'public/*min.js',
  'public/*min.css'
];

exports.pack = [
  './package.json',
  './bower.json'
];

exports.lib = {
  src: [
    'bower_components/modernizr/modernizr.js', // used by js
    'bower_components/modernizr/feature-detects/elem-progress-meter.js',
    'bower_components/pointerevents-polyfill/pointerevents.dev.js',
    'bower_components/PointerGestures/pointergestures.min.js',
    // jQuery
    'bower_components/jquery/dist/jquery.js',
    // Plugin depending on jQuery
    'bower_components/eventEmitter/EventEmitter.js', // imagesloaded dependencie
    'bower_components/eventie/eventie.js', // imagesloaded dependencie
    'bower_components/imagesloaded/imagesloaded.js',
    'bower_components/jquery-pointer-events/src/pointer.js',
    'bower_components/hevent/build/jquery.hevent.js'
  ],
  dst: 'public',
  srcMap: 'bower_components/PointerGestures/pointergestures.js.map',
  clean: 'public/lib*.js'
};

exports.css = {
  externalFiles: '',
  replace: {
    hisoFont: /(url\(')(hiso)/gi,
    fontawesome: /(url\('..\/fonts\/)(fontawesome)/gi
  },
  src: [
    'bower_components/hiso-font/font/hiso-font.css',
    'bower_components/hiso-font/font/hicon.css',
    'bower_components/fontawesome/css/font-awesome.css',
    'assets/css/front/index.styl'
  ],
  dst: 'public'
};

exports.front = {
  basedir: __dirname + '/assets/js/front',
  clean: 'public/app*js',
  dst: 'public'
};

exports.font = {
  src: [
    'bower_components/hiso-font/font/*',
    '!bower_components/hiso-font/font/*.css',
    'bower_components/fontawesome/fonts/*'
  ],
  dst: 'public/media/font'
};

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
  height:     sharedVar.carrouselHeight,
  width:      sharedVar.desktopWidth - ( sharedVar.desktopWidth * 0.1 ),
  fullDst:    __dirname + '/' + imgDst
};

exports.serverSrc = 'media/images/';


