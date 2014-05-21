'use strict';

var fs          = require('fs');
var rev         = require('gulp-rev');
var gulp        = require('gulp');
var args        = require('yargs').argv;
var conf        = require('./gulp-config.js');
var bump        = require('gulp-bump');
var gutil       = require('gulp-util');
var clean       = require('gulp-clean');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var notify      = require('gulp-notify');
var gulpif      = require('gulp-if');
var concat      = require('gulp-concat');
var replace     = require('gulp-replace');
var plumber     = require('gulp-plumber');
var runsequence = require('run-sequence');
// css
var stylus      = require('gulp-stylus');
var minifyCSS   = require('gulp-minify-css');
// browserify js
var source      = require('vinyl-source-stream');
var coffeeify   = require('coffeeify');
var streamify   = require('gulp-streamify');
var browserify  = require('browserify');
// icons
var svgSprites  = require('gulp-svg-sprites');
var svg         = svgSprites.svg;
// images
var svgmin      = require('gulp-svgmin');
var resize      = require('gulp-image-resize');
var awspublish  = require('gulp-awspublish');
// server
var lr          = require('tiny-lr'); // livereload depend on tiny-lr
var wait        = require('gulp-wait');
var open        = require('gulp-open');
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload');
// misc
var bundleData  = require('./gulp-task/hiswe-bundle-data');

/////////
// CONF
/////////

var server = lr();

var stylusVar   = require('./config/datas/stylus-var.json');

// Plumber error callback
var onError = function onError(err) {
  gutil.beep();
  console.log(err);
};

/////////
// VERSIONS
/////////

gulp.task('bump', function () {
  if (args.minor) return gulp.src(conf.pack).pipe(bump({type:'minor'})).pipe(gulp.dest('./'));
  if (args.major) return gulp.src(conf.pack).pipe(bump({type:'minor'})).pipe(gulp.dest('./'));
  return gulp.src(conf.pack).pipe(bump()).pipe(gulp.dest('./'));
});

gulp.task('rev', function () {
  gulp.src(conf.revFiles)
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest(conf.db.dst))
    .pipe(livereload(server));
});

/////////
// CSS
/////////

gulp.task('stylus', ['clean-css'], function () {
  return gulp.src(conf.css.src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulpif(/[.]styl$/, stylus({
      use: ['nib', 'hstrap'],
      define: stylusVar,
      set:['resolve url']
    })))
    .pipe(concat('index.css'))
    .pipe(replace(conf.css.replace.hisoFont, '$1./media/font/$2'))
    .pipe(gulp.dest('./public'))
    .pipe(rename('index.min.css'))
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(conf.css.dst))
    .pipe(notify({title: 'HISWE', message: 'CSS build done'}));
});

gulp.task('css', function(callback) {
  return runsequence('stylus', 'rev', callback);
});

gulp.task('clean-css', function() {
  return gulp.src('public/*.css', {read: false}).pipe(clean());
});

/////////
// JS
/////////

// LIBRARY
gulp.task('source-map', function(){
  return gulp.src(conf.lib.srcMap).pipe(gulp.dest(conf.lib.dst));
})

gulp.task('lib', ['clean-js', 'source-map'], function() {
  return gulp.src(conf.lib.src)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(conf.lib.dst))
    .pipe(notify({title: 'HISWE', message: 'LIB build done'}));
});

gulp.task('clean-js', function() {
  // gutil.log(gutil.colors.yellow(message));
  return gulp.src(conf.lib.clean, {read: false}).pipe(clean());
});

// FRONT-END APP
gulp.task('clean-app', function() {
  return gulp.src(conf.front.clean, {read: false}).pipe(clean());
});

gulp.task('frontend-app', ['clean-app'],function() {
  // see https://github.com/hughsk/vinyl-source-stream example
  var bundleStream = browserify({
      entries: conf.front.basedir + '/boot.coffee',
      basedir: conf.front.basedir
    })
    .transform(coffeeify)
    .bundle();

  return bundleStream
    .pipe(plumber({errorHandler: onError}))
    .pipe(source(conf.front.basedir + '/boot.coffee'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(conf.front.dst))
    .pipe(rename('app.min.js'))
    .pipe(streamify(uglify({mangle: false})))
    .pipe(gulp.dest(conf.front.dst))
    .pipe(notify({title: 'HISWE', message: 'FRONTEND APP build done'}))
    .pipe(livereload(server));
});

gulp.task('js', function(callback) {
  return runsequence(['lib', 'frontend-app'], 'rev', callback);
});

/////////
// FONT
/////////

gulp.task('clean-font', function() {
  return gulp.src(conf.font.dst, {read: false}).pipe(clean());
});

gulp.task('font', ['clean-font'], function() {
  gulp.src(conf.font.src)
    .pipe(gulp.dest(conf.font.dst));
});

/////////
// ICONS
/////////

gulp.task('clean-icons', function() {
  return gulp.src(conf.icons.dst, {read: false}).pipe(clean());
});

gulp.task('build-icons', ['clean-icons'], function () {
  return gulp.src(conf.icons.src)
    .pipe(rename(conf.icons.rename))
    .pipe(svg({
      defs:         true,
      svgId:        "icon-%f",
      className:    ".svgicon-%f",
      cssFile:      "hiswe-icons.css",
      svg: { defs:  "hiswe-icons.svg" }
    }))
    .pipe(gulp.dest(conf.icons.dst));
});

gulp.task('icons', ['build-icons'], function () {
  return gulp.src(conf.icons.finalSrc)
    .pipe(gulp.dest(conf.icons.finalDst));
});

/////////
// IMAGES
/////////

// Can't use gulp-if because gulp-resize don't rely on stream
// TODO: May have a workaround with gulp-streamify
gulp.task('clean-pixel', function() {
  return gulp.src(conf.img.cleanPixel, {read: false}).pipe(clean());
});

gulp.task('pixel', ['clean-pixel'], function() {
  return gulp.src(conf.img.pixel)
    .pipe(rename(conf.img.formatOriginal))
    .pipe(gulp.dest(conf.img.dst))
    .pipe(resize({height: conf.img.height, quality: 1}))
    .pipe(resize({width: conf.img.width, quality: 1}))
    .pipe(rename(conf.img.formatPreview))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-cover', function() {
  return gulp.src(conf.img.cleanCover, {read: false}).pipe(clean());
});

gulp.task('cover', ['clean-cover'], function() {
  return gulp.src(conf.img.cover)
    .pipe(rename(conf.img.formatOriginal))
    .pipe(resize({width: conf.img.coverWidth, quality: 1}))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-splash', function() {
  return gulp.src(conf.img.cleanPixel, {read: false}).pipe(clean());
});

gulp.task('splash', ['clean-splash'], function() {
  return gulp.src(conf.img.pixel)
    .pipe(rename(conf.img.formatOriginal))
    .pipe(gulp.dest(conf.img.dst))
    .pipe(rename(conf.img.formatPreview))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-svg', function() {
  return gulp.src(conf.img.cleanSvg, {read: false}).pipe(clean());
});

gulp.task('svg', ['clean-svg'], function() {
  return gulp.src(conf.img.svg)
    .pipe(svgmin())
    .pipe(rename(conf.img.formatOriginal))
    .pipe(gulp.dest(conf.img.dst));
});

gulp.task('list', function(cb) {
  var projectName = args.project;
  if (projectName != null) {
    var fileList = fs.readdirSync(conf.img.fullDst)
      .filter(function (item) {
        if (item.indexOf(projectName) === -1 ) return false;
        if (/preview/.test(item)) return false;
        return true
      });
      // .map(function (item) { return '- ![](media/images/' + item + ' "" )'; });
    console.log(fileList.join('\n'));
  } else {
    gutil.log('You shoul call ', gutil.colors.yellow('gulp list --project NAME'));
  }
  cb(null);
});

gulp.task('image', ['pixel', 'splash', 'svg', 'cover']);
gulp.task('resize', ['image']); // Aliase because I just often mess around

// Upload to Amazon S3
gulp.task('upload', function () {
  var publisher = awspublish.create({
    key:    conf.rc.AWS_ACCESS_KEY_ID,
    secret: conf.rc.AWS_SECRET_KEY,
    bucket: conf.rc.AWS_BUCKET
  });

  return gulp.src(conf.img.dst + '*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
    // Don't notify has it run for every images…
    // .pipe(notify({title: 'HISWE', message: 'UPLOAD done'}));
});

/////////
// JSON
/////////

gulp.task('json', function() {
  return gulp.src(conf.db.src)
    .pipe(bundleData())
    .pipe(gulp.dest(conf.db.dst));
});

/////////
// BUILD ALL
/////////

gulp.task('build', function(callback) {
  return runsequence(['icons', 'frontend-app', 'lib', 'stylus', 'json', 'resize'], 'rev', callback);
});

/////////
// SERVER
/////////

gulp.task('open-browser', function (){
  // Has to be a file in order to proceed…
  return gulp.src('./README.md').pipe(wait(1000)).pipe(open('', {url: "http://localhost:5000"}));
});

gulp.task('notify-restart', function () {
  // wait server to properly restart
  setTimeout(function() {
    gulp.src('').pipe(notify({title: 'HISWE', message: 'restart server'}));
    server.changed({body: {files: ['index.html']}});
  }, 1000);
});

// Watch
gulp.task('watch', function() {
  server.listen(35729, function (err) { if (err) { return console.log(err) }});
  gulp.watch(['./assets/css/front/**/*.styl'], ['css']);
  gulp.watch(['./assets/js/front/**/*.coffee'], ['frontend-app']);
  gulp.watch(['./config/datas/*.md'], ['json']);
  gulp.watch('./views/**/*.jade').on('change', function() {
    gulp.src('').pipe(notify({title: 'HISWE', message: 'reload html'}));
    server.changed({body: {files: ['index.html']}});
  });
});

// Nodemon server
gulp.task('express', ['build'], function () {
  nodemon({
    script: 'server.js', ext: 'coffee json', watch: ['controllers/**/*', 'config/*.coffee', 'config/datas/db-home.json'],
    env: { 'NODE_ENV': 'development', HISWE_LIVERELOAD: true}
  })
  .on('restart', ['notify-restart'])
  .on('crash', onError);
});

gulp.task('server', function (callback){
  if (args.build != null && args.build === false) {
    return runsequence(['watch', 'express'], 'open-browser', callback);
  }
  return runsequence('build', ['watch', 'express'], 'open-browser', callback);
});

/////////
// DOC
/////////

gulp.task('default', function() {
  var m = gutil.colors.magenta
  var g = gutil.colors.grey
  console.log(m('bump'), g('..............'), 'patch version of json');
  console.log(m('  --minor'), g('.........'), 'minor version of json');
  console.log(m('  --major'), g('.........'), 'major version of json');
  console.log(m('font'), g('..............'), 'Copy fonts to the right folder');
  console.log(m('js'), g('................'), 'Concat & uglify + rev');
  console.log(m('css'), g('...............'), 'Compile stylus + uglify + rev');
  console.log(m('json'), g('..............'), 'Package all datas to json');
  console.log(m('build'), g('.............'), 'js + css + rev');
  console.log(m('pixel'), g('.............'), 'Resize pixel images');
  console.log(m('svg'), g('...............'), 'clean svg images');
  console.log(m('image'), g('.............'), 'pixel + svg');
  console.log(m('list'), g('..............'), 'list image');
  console.log(m('  --project name'), g('..'), 'of a specific project');
  console.log(m('server'), g('............'), 'Watch + server');
  console.log(m('  --no-build'), g('......'), 'Skip the build');
});
