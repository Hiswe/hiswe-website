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
var replace     = require('gulp-replace');
var nodemon     = require('gulp-nodemon');
var coffeeify   = require('coffeeify');
var streamify   = require('gulp-streamify')
var minifyCSS   = require('gulp-minify-css');
var livereload  = require('gulp-livereload');
var browserify  = require('browserify');

/////////
// CONF
/////////

var server = lr();

var stylusVar = require('./config/datas/stylus-var.json');
stylusVar.isDev = true;


/////////
// VERSIONS
/////////

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
      define: stylusVar,
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

// front-end app
gulp.task('frontend-app', function() {
  // see https://github.com/hughsk/vinyl-source-stream example
  var bundleStream = browserify({
      entries: path.frontAppBasedir + '/boot.coffee',
      basedir: path.frontAppBasedir
    })
    .transform(coffeeify)
    .bundle();

  return bundleStream
    .pipe(source(path.frontAppBasedir + '/boot.coffee'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./public'))
    .pipe(rename('app.min.js'))
    .pipe(streamify(uglify({mangle: false})))
    .pipe(gulp.dest('./public'))
    .pipe(notify({title: 'App', message: 'build done'}))
    .pipe(livereload(server));
});

gulp.task('js', ['lib', 'frontend-app'], function() {
  gulp.src([path.revFiles])
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest(path.datas))
    .pipe(livereload(server));
});

gulp.task('clean-js', function() {
  return gulp.src('public/*.js', {read: false}).pipe(clean());
});

// Resize images
gulp.task('clean-image', function() {
  return gulp.src([path.imgDst + '*', '!' + path.imgDst + '*.svg'], {read: false}).pipe(clean());
});

gulp.task('clean-svg', function() {
  return gulp.src(path.imgDst + '*.svg', {read: false}).pipe(clean());
});

gulp.task('resize', ['clean-image'], function() {
  return gulp.src(path.imgSrc)
    .pipe(resize({width: 294, quality: 0.8}))
    .pipe(rename(function(path) { path.basename = uslug(path.basename); }))
    .pipe(gulp.dest(path.imgDst))
});

gulp.task('svg', ['clean-svg'], function() {
  return gulp.src(path.svgSrc)
    .pipe(svgmin())
    .pipe(rename(function(path) { path.basename = uslug(path.basename); }))
    .pipe(gulp.dest(path.imgDst));
});

gulp.task('image', ['resize', 'svg']);

// Build data json
gulp.task('json', require('./gulp-data.js'));

// build for production
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

  gulp.watch(['./config/datas/*.md'], ['json']).on('change', function() {
    gulp.src('').pipe(notify({title: 'Hiswe server', message: 'reload datas'}));
    server.changed({body: {files: ['index.html']}});
  });;

  gulp.watch('./views/**/*.jade').on('change', function() {
    gulp.src('').pipe(notify({title: 'Hiswe server', message: 'reload html'}));
    server.changed({body: {files: ['index.html']}});
  });
});

// Nodemon server
gulp.task('notify-restart', function () {
  gulp.src('').pipe(notify({title: 'Hiswe server', message: 'restart'}));
});

gulp.task('express', ['build'], function () {
  nodemon({
    script: 'server.js', ext: 'js coffee', watch: ['controllers/**/*', 'config/*'],
    env: { 'NODE_ENV': 'development', HISWE_LIVERELOAD: true}
  })
  .on('restart', ['notify-restart']);
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
  console.log(gutil.colors.red('bump'), '       ', 'patch version of json');
  console.log(gutil.colors.red('bump-minor'), ' ', 'minor version of json');
  console.log(gutil.colors.red('bump-major'), ' ', 'major version of json');
  console.log(gutil.colors.red('font'), '       ', 'Copy fonts to the right folder');
  console.log(gutil.colors.red('js'), '         ', 'Concat & uglify + rev');
  console.log(gutil.colors.red('css'), '        ', 'Compile stylus + uglify + rev');
  console.log(gutil.colors.red('build'), '      ', 'js + css + rev');
  console.log(gutil.colors.red('resize'), '     ', 'Resize pixel images');
  console.log(gutil.colors.red('svg'), '        ', 'clean svg images');
  console.log(gutil.colors.red('image'), '      ', 'resize + svg');
  console.log(gutil.colors.red('express'), '    ', 'Start server');
  console.log(gutil.colors.red('watch'), '      ', 'Watch stylus');
  console.log(gutil.colors.red('start'), '      ', 'Watch + server');
});
