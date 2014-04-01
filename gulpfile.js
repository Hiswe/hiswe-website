'use strict';

var gulp        = require('gulp');
var lr          = require('tiny-lr'); // livereload depend on tiny-lr
var rev         = require('gulp-rev');
var uslug       = require('uslug');
var bump        = require('gulp-bump');
var gutil       = require('gulp-util');
var clean       = require('gulp-rimraf');
var uglify      = require('gulp-uglify');
var stylus      = require('gulp-stylus');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var notify      = require('gulp-notify');
var resize      = require('gulp-image-resize');
var replace     = require('gulp-replace'); // use to fix  rev manifest https://github.com/sindresorhus/gulp-rev/pull/18
var nodemon     = require('gulp-nodemon');
var minifyCSS   = require('gulp-minify-css');
var livereload  = require('gulp-livereload');
var runSequence = require('run-sequence'); // Wait for orchestrator to be fixed https://www.npmjs.org/package/run-sequence

var server = lr();

var path = {
  libs: [
    'bower_components/modernizr/modernizr.js', // used by js
    'bower_components/jquery/dist/jquery.js',
    'bower_components/hevent/build/jquery.hevent.js'],
  imgSrc: 'public/media/source/*',
  imgDst: 'public/media/images/'
};

var stylus_var = require('./config/stylus_var.json');
stylus_var.isDev = true;


// Bump json version
gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

/////////
// ASSETS
/////////

// Copy font
gulp.task('clean-font', function() {
  gulp.src('public/media/font/', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('font', ['clean-font'], function() {
  gulp.src('bower_components/hiso-font/font/**', {base: './bower_components/hiso-font'})
    .pipe(gulp.dest('public/media/'));
});

// Revision
gulp.task('rev', function() {
  gulp.src(['public/*.css', '!public/*-*.css', 'public/*.js', '!public/*-*.js'])
  .pipe(rev())
  .pipe(gulp.dest('public'))
  .pipe(rev.manifest())     // generate a revision manifest file
  .pipe(gulp.dest('config'))
  .pipe(replace(/(.*)(:\s")\/(.*)/gi, '$1$2$3'))
  .pipe(gulp.dest('config'))
  .pipe(livereload(server));
});

// Stylus
gulp.task('stylus', function () {
  return gulp.src('./assets/css/front/index.styl')
    .pipe(stylus({use: ['nib', 'hstrap'], define: stylus_var}))
    .pipe(gulp.dest('./public'))
    .pipe(rename('index.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public'))
    .pipe(notify({title: 'Stylus', message: 'CSS build done'}));
});

gulp.task('css', function(callback) {
  runSequence('stylus', 'rev', callback);
});

// Concat & compress lib
gulp.task('lib', function() {
  return gulp.src(path.libs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('public'))
    .pipe(notify({title: 'Lib', message: 'build done'}));
});

gulp.task('js', function(callback) {
  runSequence('lib', 'rev', callback);
});

// Resize images
gulp.task('clean-image', function() {
  gulp.src('public/media/images/*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('resize', ['clean-image'], function() {
  gulp.src(path.imgSrc)
    .pipe(resize({width: 294, quality: 0.8}))
    .pipe(rename(function(path) { path.basename = uslug(path.basename); }))
    .pipe(gulp.dest(path.imgDst))
});

// build for production
gulp.task('build', function(callback) {
  runSequence(['lib', 'css'], 'rev', callback);
});

/////////
// SERVER
/////////

// Watch
gulp.task('watch', function() {
  server.listen(35729, function (err) {
    if (err) { return console.log(err) }
  });
  gulp.watch(['./assets/css/front/**/*.styl'], ['css']);
  gulp.watch('./views/**/*.jade').on('change', function(file) {
    // server.changed(file.path);
    gulp.src('').pipe(notify({title: 'Hiswe server', message: 'reload html'}));
    server.changed({body: {files: ['index.html']}});
  });
});

// Nodemon server
gulp.task('notify-restart', function () {
  gulp.src('').pipe(notify({title: 'Hiswe server', message: 'restart'}));
});

gulp.task('express', function () {
  nodemon({
    script: 'server.js', ext: 'js coffee', watch: ['controllers/**/*', 'config/*', 'public/*'],
    env: { 'NODE_ENV': 'development', HISWE_LIVERELOAD: true}
  }).on('restart', ['notify-restart'])
});

gulp.task('server', ['watch','express']);

/////////
// DOC
/////////

gulp.task('default', function() {
  console.log(gutil.colors.red('bump'), '   ', 'bump version of json');
  console.log(gutil.colors.red('font'), '   ', 'Copy fonts to the right folder');
  console.log(gutil.colors.red('js'), '     ', 'Concat & uglify + rev');
  console.log(gutil.colors.red('css'), '    ', 'Compile stylus + uglify + rev');
  console.log(gutil.colors.red('build'), '  ', 'js + css + rev');
  console.log(gutil.colors.red('resize'), ' ', 'Resize images');
  console.log(gutil.colors.red('express'), '', 'Start server');
  console.log(gutil.colors.red('watch'), '  ', 'Watch stylus');
  console.log(gutil.colors.red('server'), ' ', 'Watch + server');
});
