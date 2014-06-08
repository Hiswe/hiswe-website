'use strict';

var sharedVar       = require('./shared/stylus-var');
var rc = exports.rc = require('./server/settings');
var slug            = require('slug');

slug.charmap['_'] = '-'

/////////
// CONF & MISC
/////////

var publicFolder = exports.public = 'public';
var mediaFolder = exports.media   = publicFolder + '/media';
var basedir = exports.basedir   = __dirname;

exports.msg = function (message) {
  return {title: 'HISWE', message: message}
};

exports.rev = {
  src: ['/app.js', '/vendor.js', '/index.css'].map( function(item){ return publicFolder + item}),
  dst: publicFolder
};

exports.heroku = {
  format: function format(stdout, args) {
    if (args.log) {
      var regexp = /^(\d{4}(?:-\d\d){2})T((?:\d\d:){2}\d\d).*(app|heroku).*\]:\s(.*)$/mg
      return stdout.replace(regexp, '$1 $2 $3 : $4');
    }
    return stdout;
  }
};

exports.lint = {
  cyclomatic_complexity: {level: 'warn'},
  empty_constructor_needs_parens: {level: 'warn'},
  max_line_length: {level: 'ignore'},
  missing_fat_arrows: {level: 'warn'},
  newlines_after_classes: {level: 'warn'},
  no_empty_functions: {level: 'warn'},
  no_empty_param_list: {level: 'warn'},
  no_implicit_braces: {level: 'warn'},
  no_interpolation_in_single_quotes: {level: 'warn'},
  no_stand_alone_at: {level: 'warn'},
  no_unnecessary_double_quotes: {level: 'warn'}
};

exports.pack = [
  './package.json',
  './bower.json'
];

/////////
// CSS
/////////

exports.css = {
  externalFiles: '',
  replace: {
    hisoFont: /(url\(')(hiso)/gi
  },
  src: [
    'bower_components/hiso-font/font/hiso-font.css',
    'bower_components/hiso-font/font/hicon.css',
    'public/media/icons/hiswe-icons.css',
    'front/css/index.styl'
  ],
  dst: publicFolder
};

/////////
// JS
/////////

var modernizr = require('./gulp-task/browsernizr-conf.js').all

var vendor = {
  clean: publicFolder + '/vendor*js',
  noParse: ['hammerjs', 'jquery'],
  require: modernizr.concat(['hammerjs', 'jquery', 'eventie', 'velocity-animate', 'imagesloaded', 'jquery-hammerjs'])
};

var eventEmitter = {
  src: 'wolfy87-eventemitter',
  expose: 'eventEmitter'
};

var front = {
  clean: publicFolder + '/app*js',
  src: basedir + '/front/js/boot.coffee',
  external: function(){
    var external = vendor.require.slice();
    external = external.concat(['eventEmitter', 'conf']);
    return external;
  }()
};

exports.js = {
  front: front,
  vendor: vendor,
  modernizr: modernizr
};

/////////
// JSON
/////////

exports.db = {
  // ~ is for Mou temp files
  src: ['!server/datas/*~.md', 'server/datas/*.md'],
  dst: 'server/datas'
}

/////////
// ASSETS
/////////

exports.font = {
  src: [
    'bower_components/hiso-font/font/*',
    '!bower_components/hiso-font/font/*.css'
  ],
  dst: mediaFolder + '/font'
};

exports.icons = {
  src: rc.GULP_SRC + '/icons/*.svg',
  svgDst:   'views/includes',
  // TODO should be elsewhere
  cssDst:   'public/media/icons',
  renameDst: function (path) {
    path.basename = 'hiswe-icons';
  },
  rename: function (path) {
    path.basename = path.basename.replace(/(hiswe-icons_)/, '');
    path.basename = slug(path.basename).toLowerCase();
  }
};

/////////
// IMAGES
/////////

var imgSrc = rc.GULP_SRC + '/media'; // don't want a local path in my code :P
var imgDst = mediaFolder + '/images/';
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
  serverSrc:  '/media/images/',
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

/////////
// SERVER
/////////

exports.server = {
  src: 'server/**/*.coffee'
};
