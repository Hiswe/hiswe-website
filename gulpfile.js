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
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload')


// https://www.npmjs.org/package/gulp-rev/

var path = {
  libs: ['bower_components/modernizr/modernizr.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/hevent/build/jquery.hevent.js'],
  imgSrc: 'public/media/source/*',
  imgDst: 'public/media/images/'
};

var stylus_var = require('./stylus_var.json');
stylus_var.isDev = true;

// Copy font
gulp.task('clean-font', function() {
  gulp.src('public/media/font/', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('font', ['clean-font'], function() {
  gulp.src('bower_components/hiso-font/font/**', {base: './bower_components/hiso-font'})
    .pipe(gulp.dest('public/media/'));
});

// Bump json version
gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

// Stylus
gulp.task('stylus', function () {
  gulp.src('./assets/css/front/index.styl')
    .pipe(stylus({use: ['nib', 'hstrap'], define: stylus_var}))
    .pipe(gulp.dest('./public'))
    .pipe(notify({title: 'Stylus', message: 'CSS build'}));
});

// Concat & compress lib
gulp.task('lib', function() {
  gulp.src(path.libs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('public'))
    .pipe(notify({title: 'LIB', message: 'build done'}));
});

// Nodemon server
gulp.task('notify-restart', function () {
  gulp.src('').pipe(notify({title: 'Hiswe server', message: 'restart'}));
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js', ext: 'js coffee', watch: ['controllers/**/*', 'config/*', 'public/*'],
    env: { 'NODE_ENV': 'development', HISWE_LIVERELOAD: true}
  }).on('restart', ['notify-restart'])
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

// Watch
gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(['./assets/css/front/*.styl','./assets/css/front/**/*.styl'], ['stylus'])
    .on('change', function(file){
      server.changed(file.path);
    });
});

// Light doc
gulp.task('default', function() {
  console.log(gutil.colors.red('bump'), '  ', 'bump version of json');
  console.log(gutil.colors.red('font'), '  ', 'Copy fonts to the right folder');
  console.log(gutil.colors.red('lib'), '   ', 'Concat & uglify libs');
  console.log(gutil.colors.red('resize'), '', 'Resize images');
  console.log(gutil.colors.red('server'), '', 'Start server');
  console.log(gutil.colors.red('stylus'), '', 'Compile stylus');
  console.log(gutil.colors.red('watch'), ' ', 'Watch stylus');
});
