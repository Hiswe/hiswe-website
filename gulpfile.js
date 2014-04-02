'use strict';

var gulp        = require('gulp');
var lr          = require('tiny-lr'); // livereload depend on tiny-lr
var rev         = require('gulp-rev');
var bump        = require('gulp-bump');
var wait        = require('gulp-wait');
var open        = require('gulp-open');
var gutil       = require('gulp-util');
var clean       = require('gulp-clean');
var uslug       = require('uslug');
var open        = require('gulp-open');
var stylus      = require('gulp-stylus');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var notify      = require('gulp-notify');
var resize      = require('gulp-image-resize');
var replace     = require('gulp-replace');
var nodemon     = require('gulp-nodemon');
var minifyCSS   = require('gulp-minify-css');
var livereload  = require('gulp-livereload');

var server = lr();

var path = {
  libs: [
    'bower_components/modernizr/modernizr.js', // used by js
    'bower_components/jquery/dist/jquery.js',
    'bower_components/hevent/build/jquery.hevent.js'],
  font: [
    'bower_components/hiso-font/font/**',
    '!bower_components/hiso-font/font/*.css'
  ],
  imgSrc: 'public/media/source/*',
  imgDst: 'public/media/images/',
  cssImport: ['../../../bower_components/hiso-font/font/hiso-font.css',
    '../../../bower_components/hiso-font/font/hicon.css']
};

var stylus_var = require('./config/stylus_var.json');
stylus_var.isDev = true;


// Bump json version
gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function() {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type:'major'}))
    .pipe(gulp.dest('./'));
});

/////////
// ASSETS
/////////

// Copy font
gulp.task('clean-font', function() {
  return gulp.src('public/media/font/', {read: false}).pipe(clean());
});

gulp.task('font', ['clean-font'], function() {
  gulp.src(path.font, {base: './bower_components/hiso-font'})
    .pipe(gulp.dest('public/media/'));
});

// Stylus
gulp.task('stylus', ['clean-css'], function () {
  return gulp.src('./assets/css/front/index.styl')
    .pipe(stylus({
      use: ['nib', 'hstrap'],
      define: stylus_var,
      import: path.cssImport,
      set:['resolve url', 'include css']
    }))
    .pipe(replace(/\.\.\/\.\.\/\.\.\/bower_components\/hiso-font/gi, './media'))
    .pipe(gulp.dest('./public'))
    .pipe(rename('index.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public'))
    .pipe(notify({title: 'Stylus', message: 'CSS build done'}));
});

gulp.task('css', ['stylus'], function() {
  gulp.src(['public/*.min.css'])
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('config'))
    .pipe(replace(/(.*)(:\s")\/(.*)/gi, '$1$2$3')) // use to fix  rev manifest https://github.com/sindresorhus/gulp-rev/pull/18
    .pipe(gulp.dest('config'))
    .pipe(livereload(server));
});

gulp.task('clean-css', function() {
  return gulp.src('public/*.css', {read: false}).pipe(clean());
});

// Concat & compress lib
gulp.task('lib', ['clean-js'], function() {
  return gulp.src(path.libs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('public'))
    .pipe(notify({title: 'Lib', message: 'build done'}));
});

gulp.task('js', ['lib'], function() {
  gulp.src(['public/*.min.js'])
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('config'))
    .pipe(replace(/(.*)(:\s")\/(.*)/gi, '$1$2$3')) // use to fix  rev manifest https://github.com/sindresorhus/gulp-rev/pull/18
    .pipe(gulp.dest('config'))
    .pipe(livereload(server));
});

gulp.task('clean-js', function() {
  return gulp.src('public/*.js', {read: false}).pipe(clean());
});

// Resize images
gulp.task('clean-image', function() {
  return gulp.src('public/media/images/*', {read: false}).pipe(clean());
});

gulp.task('resize', ['clean-image'], function() {
  gulp.src(path.imgSrc)
    .pipe(resize({width: 294, quality: 0.8}))
    .pipe(rename(function(path) { path.basename = uslug(path.basename); }))
    .pipe(gulp.dest(path.imgDst))
});

// build for production
gulp.task('build', ['lib', 'stylus'], function() {
  gulp.src(['public/*min.js', 'public/*.min.css'])
  .pipe(rev())
  .pipe(gulp.dest('public'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('config'))
  .pipe(replace(/(.*)(:\s")\/(.*)/gi, '$1$2$3')) // use to fix rev manifest https://github.com/sindresorhus/gulp-rev/pull/18
  .pipe(gulp.dest('config'))
  .pipe(livereload(server));
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
  gulp.watch('./views/**/*.jade').on('change', function() {
    gulp.src('').pipe(notify({title: 'Hiswe server', message: 'reload html'}));
    server.changed({body: {files: ['index.html']}});
  });
});

// Nodemon server
gulp.task('notify-restart', function () {
  gulp.src('').pipe(notify({title: 'Hiswe server', message: 'restart'}));
});

gulp.task('express', function (callback) {
  nodemon({
    script: 'server.js', ext: 'js coffee', watch: ['controllers/**/*', 'config/*', 'public/*'],
    env: { 'NODE_ENV': 'development', HISWE_LIVERELOAD: true}
  })
  .on('restart', ['notify-restart'])
  .on('start', function() {
    console.log('start');
    callback();
  });
});

gulp.task('server', ['watch', 'express']);

gulp.task("start", ['server'], function(){
  gulp.src('./README.md').pipe(wait(1000)).pipe(open('', {url: "http://localhost:5000"}));
});

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
  console.log(gutil.colors.red('start'), '  ', 'Watch + server');
});
