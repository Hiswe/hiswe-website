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

exports.pack = ['./package.json', './bower.json'];

exports.lib = {
  src: [
    'bower_components/modernizr/modernizr.js', // used by js
    'bower_components/pointerevents-polyfill/pointerevents.dev.js',
    'bower_components/PointerGestures/pointergestures.min.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-pointer-events/src/pointer.js',
    'bower_components/hevent/build/jquery.hevent.js'
  ],
  dst: 'public',
  clean: 'public/media/lib*.js'
};

exports.frontAppBasedir = __dirname + '/assets/js/front';

exports.font = [
  'bower_components/hiso-font/font/**',
  '!bower_components/hiso-font/font/*.css'
];

exports.imgSrc = [
  'public/media/source/*',
  '!public/media/source/*.svg'
];

exports.svgSrc = 'public/media/source/*.svg';

exports.imgDst = 'public/media/images/';

exports.img = {
  src: ['public/media/source/*', '!public/media/source/*.svg'],
  svg: 'public/media/source/*.svg',
  dst: 'public/media/images/'
}

exports.serverSrc = 'media/images/';

exports.cssImport = [
  '../../../bower_components/hiso-font/font/hiso-font.css',
  '../../../bower_components/hiso-font/font/hicon.css'
];