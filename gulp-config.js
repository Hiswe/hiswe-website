'use strict';

var sharedVar       = require('./shared/stylus-var.json');
var rc = exports.rc = require('rc')('HISWE');
var slug            = require('slug');

slug.charmap['_'] = '-'

exports.db = {
  // ~ is for Mou temp files
  src: ['!server/datas/*~.md', 'server/datas/*.md'],
  dst: 'server/datas'
}

exports.pack = [
  './package.json',
  './bower.json'
];

exports.rev = {
  src: ['public/app.js', 'public/lib.js', 'public/index.css'],
  dst: 'public',
  formatName: function formatOriginal(path) {
    path.basename = path.basename + '.min';
  }
}

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
    'shared/jquery.mobile.custom.js',
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
    'front/css/index.styl'
  ],
  dst: 'public'
};

exports.server = {
  src: 'server/**/*.coffee',
  lint: {
    cyclomatic_complexity: {level: 'warn'},
    empty_constructor_needs_parens: {level: 'warn'},
    max_line_length: {level: 'ignore'},
    missing_fat_arrows: {level: 'warn'},
    newlines_after_classes: {level: 'warn'},
    no_empty_functions: {level: 'warn'},
    no_empty_param_list: {level: 'warn'},
    no_implicit_braces: {level: 'error'},
    no_interpolation_in_single_quotes: {level: 'error'},
    no_stand_alone_at: {level: 'error'},
    no_unnecessary_double_quotes: {level: 'warn'}
  }
};

exports.front = {
  basedir: __dirname + '/front/js',
  src: 'front/js/*.coffee',
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
  finalDst: 'views/includes',
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
  cover:      imgSrc + '/cover*.{jpg,jpeg,png}',
  cleanCover: imgDst + 'cover*.{jpg,jpeg,png}',
  coverWidth: 288,
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
