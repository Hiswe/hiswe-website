'use strict';

var sharedVar       = require('./config/datas/stylus-var.json');
var rc = exports.rc = require('rc')('HISWE');
var slug            = require('slug');

slug.charmap['_'] = '-'

exports.db = {
  src: 'config/datas/*.md',
  dst: 'config/datas'
}

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
    // 'bower_components/60fps-scroll/dist/60fps-scroll.js',
    'bower_components/modernizr/modernizr.js', // used by js
    'bower_components/modernizr/feature-detects/elem-progress-meter.js',
    // 'bower_components/pointerevents-polyfill/pointerevents.dev.js',
    // 'bower_components/PointerGestures/pointergestures.min.js',
    // jQuery
    'bower_components/jquery/dist/jquery.js',
    // Plugin depending on jQuery
    'public/jquery.mobile.custom.js',
    'bower_components/imagesloaded/imagesloaded.pkgd.js',
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
    hisoFont: /(url\(')(hiso)/gi
  },
  src: [
    'bower_components/hiso-font/font/hiso-font.css',
    'bower_components/hiso-font/font/hicon.css',
    // 'public/media/icons/hiswe-icons.css',
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
    '!bower_components/hiso-font/font/*.css'
  ],
  dst: 'public/media/font'
};

exports.icons = {
  src: rc.GULP_SRC + '/icons/*.svg',
  clean: rc.GULP_SRC + '/icons/def',
  dst: 'public/media/icons',
  finalSrc: 'public/media/icons/*.svg',
  finalDst: 'views/front/includes',
  rename: function rename(path) {
    path.basename = path.basename.replace(/(hiswe-icons_)/, '');
    path.basename = slug(path.basename).toLowerCase();
  }
};

var imgSrc = rc.GULP_SRC + '/media'; // don't want a local path in my code :P
var imgDst = 'public/media/images/';
exports.img = {
  pixel:      [imgSrc + '/**/*.{jpg,jpeg,png}', '!' + imgSrc + 'splash*.{jpg,jpeg,png}'],
  cleanPixel: [imgDst + '*.{jpg,jpeg,png}', '!' + imgDst + 'splash*.{jpg,jpeg,png}'],
  splash:     imgSrc + '/**/splash*.{jpg,jpeg,png}',
  cleanSplash:imgDst + 'splash*.{jpg,jpeg,png}',
  svg:        imgSrc + '/**/*.svg',
  cleanSvg:   imgDst + '*.svg',
  dst:        imgDst,
  height:     sharedVar.carrouselHeight,
  width:      sharedVar.desktopWidth - ( sharedVar.desktopWidth * 0.1 ),
  fullDst:    __dirname + '/' + imgDst,
  formatOriginal: function formatOriginal(path) {
    if (path.dirname !== '.') {
      path.basename = path.dirname + '-' + path.basename
      path.dirname  = '.'
    }
    path.basename = slug(path.basename).toLowerCase();
  },
  formatPreview: function formatPreview (path) {
    path.basename = slug(path.basename).toLowerCase() + '-preview';
  }
};

exports.serverSrc = 'media/images/';
