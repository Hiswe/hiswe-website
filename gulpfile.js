'use strict';

var lr          = require('tiny-lr'); // livereload depend on tiny-lr
var rev         = require('gulp-rev');
var gulp        = require('gulp');
var path        = require('./gulp-path.js');
var bump        = require('gulp-bump');
var wait        = require('gulp-wait');
var open        = require('gulp-open');
var gutil       = require('gulp-util');
var clean       = require('gulp-clean');
var uslug       = require('uslug');
var source      = require('vinyl-source-stream');
var stylus      = require('gulp-stylus');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var notify      = require('gulp-notify');
var svgmin      = require('gulp-svgmin');
var resize      = require('gulp-image-resize');
var gulpif      = require('gulp-if');
var replace     = require('gulp-replace');
var nodemon     = require('gulp-nodemon');
var plumber     = require('gulp-plumber');
var minifyCSS   = require('gulp-minify-css');
var livereload  = require('gulp-livereload');
var coffeeify   = require('coffeeify');
var streamify   = require('gulp-streamify');
var browserify  = require('browserify');

/////////
// CONF
/////////

var server = lr();

var stylusVar = require('./config/datas/stylus-var.json');
stylusVar.isDev = true;

// Plumber error callback
var onError = function onError(err) {
  gutil.beep();
  console.log(err);
};

/////////
// VERSIONS
/////////

gulp.task('patch', function () {
  return gulp.src(path.pack).pipe(bump()).pipe(gulp.dest('./'));
});

gulp.task('minor', function() {
  return gulp.src(path.pack).pipe(bump({type:'minor'})).pipe(gulp.dest('./'));
});

gulp.task('major', function() {
  return gulp.src(path.pack).pipe(bump({type:'major'})).pipe(gulp.dest('./'));
});

/////////
// CSS
/////////

gulp.task('stylus', ['clean-css'], function () {
  return gulp.src('./assets/css/front/index.styl')
    .pipe(plumber({errorHandler: onError}))
    .pipe(stylus({
      use: ['nib', 'hstrap'],
      define: stylusVar,
      import: path.cssImport,
      set:['resolve url', 'include css']
    }))
    .pipe(replace(/\.\.\/\.\.\/\.\.\/bower_components\/hiso-font/gi, './media'))
    .pipe(gulp.dest('./public'))
    .pipe(rename('index.min.css'))
    .pipe(minifyCSS())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public'))
    .pipe(notify({title: 'HISWE', message: 'CSS build done'}));
});

gulp.task('css', ['stylus'], function() {
  gulp.src(path.revFiles)
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest(path.datas))
    .pipe(livereload(server));
});

gulp.task('clean-css', function() {
  return gulp.src('public/*.css', {read: false}).pipe(clean());
});

/////////
// JS
/////////

// LIBRARY
gulp.task('source-map', function(){
  return gulp.src(path.lib.srcMap).pipe(gulp.dest(path.lib.dst));
})

gulp.task('lib', ['clean-js', 'source-map'], function() {
  return gulp.src(path.lib.src)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(path.lib.dst))
    .pipe(notify({title: 'HISWE', message: 'LIB build done'}));
});

gulp.task('clean-js', function() {
  gutil.log(gutil.colors.yellow('Don\'t forget to build ./bower_components/PointerGestures \n cd ./bower_components/PointerGestures && npm install && grunt'));
  return gulp.src(path.lib.clean, {read: false}).pipe(clean());
});

// FRONT-END APP
gulp.task('clean-app', function() {
  return gulp.src(path.front.clean, {read: false}).pipe(clean());
});


gulp.task('frontend-app', ['clean-app'],function() {
  // see https://github.com/hughsk/vinyl-source-stream example
  var bundleStream = browserify({
      entries: path.front.basedir + '/boot.coffee',
      basedir: path.front.basedir
    })
    .transform(coffeeify)
    .bundle();

  return bundleStream
    .pipe(plumber({errorHandler: onError}))
    .pipe(source(path.front.basedir + '/boot.coffee'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(path.front.dst))
    .pipe(rename('app.min.js'))
    .pipe(streamify(uglify({mangle: false})))
    .pipe(gulp.dest(path.front.dst))
    .pipe(notify({title: 'HISWE', message: 'FRONTEND APP build done'}))
    .pipe(livereload(server));
});

gulp.task('js', ['lib', 'frontend-app'], function() {
  gulp.src(path.revFiles)
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest(path.datas))
    .pipe(livereload(server));
});

/////////
// ASSETS
/////////

// FONT
gulp.task('clean-font', function() {
  return gulp.src('public/media/font/', {read: false}).pipe(clean());
});

gulp.task('font', ['clean-font'], function() {
  gulp.src(path.font, {base: './bower_components/hiso-font'})
    .pipe(gulp.dest('public/media/'));
});

// IMAGES
// TODO use gulp-if…
gulp.task('clean-image', function() {
  return gulp.src([path.img.dst + '*', '!' + path.img.dst + '*.svg'], {read: false}).pipe(clean());
});

gulp.task('clean-svg', function() {
  return gulp.src(path.img.dst + '*.svg', {read: false}).pipe(clean());
});

gulp.task('resize', ['clean-image'], function() {
  return gulp.src(path.img.src)
    .pipe(resize({width: 294, quality: 0.8}))
    .pipe(rename(function(path) { path.basename = uslug(path.basename, path.uslug); }))
    .pipe(gulp.dest(path.img.dst))
});

gulp.task('svg', ['clean-svg'], function() {
  return gulp.src(path.img.svg)
    .pipe(svgmin())
    .pipe(rename(function(path) { path.basename = uslug(path.basename, path.uslug); }))
    .pipe(gulp.dest(path.img.dst));
});

gulp.task('image', ['resize', 'svg']);

// JSON
gulp.task('json', require('./gulp-data.js'));

/////////
// BUILD ALL
/////////

gulp.task('build', ['frontend-app', 'lib', 'stylus', 'json'], function() {
  return gulp.src(path.revFiles)
  .pipe(rev())
  .pipe(gulp.dest('public'))
  .pipe(rev.manifest())
  .pipe(gulp.dest(path.datas))
  .pipe(livereload(server));
});

/////////
// SERVER
/////////

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
gulp.task('notify-restart', function () {
  // wait server to properly restart
  setTimeout(function() {
    gulp.src('').pipe(notify({title: 'HISWE', message: 'restart server'}));
    server.changed({body: {files: ['index.html']}});
  }, 1000);
});

gulp.task('express', ['build'], function () {
  nodemon({
    script: 'server.js', ext: 'coffee json', watch: ['controllers/**/*', 'config/*.coffee', 'config/datas/db-work.json'],
    env: { 'NODE_ENV': 'development', HISWE_LIVERELOAD: true}
  })
  .on('restart', ['notify-restart'])
  .on('crash', onError);
});

gulp.task('server', ['watch', 'express']);

gulp.task("start", ['server'], function(){
  // Has to be a file in order to proceed
  gulp.src('./README.md').pipe(wait(1000)).pipe(open('', {url: "http://localhost:5000"}));
});

/////////
// DOC
/////////

gulp.task('default', function() {
  console.log(gutil.colors.red('patch'), '      ', 'patch version of json');
  console.log(gutil.colors.red('minor'), '      ', 'minor version of json');
  console.log(gutil.colors.red('major'), '      ', 'major version of json');
  console.log(gutil.colors.red('font'), '       ', 'Copy fonts to the right folder');
  console.log(gutil.colors.red('js'), '         ', 'Concat & uglify + rev');
  console.log(gutil.colors.red('css'), '        ', 'Compile stylus + uglify + rev');
  console.log(gutil.colors.red('json'), '       ', 'Package all datas to json');
  console.log(gutil.colors.red('build'), '      ', 'js + css + rev');
  console.log(gutil.colors.red('resize'), '     ', 'Resize pixel images');
  console.log(gutil.colors.red('svg'), '        ', 'clean svg images');
  console.log(gutil.colors.red('image'), '      ', 'resize + svg');
  console.log(gutil.colors.red('start'), '      ', 'Watch + server');
});
