var gulp    = require('gulp');
var clean   = require('gulp-rimraf');
var uslug   = require('uslug');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var notify  = require('gulp-notify');
var resize  = require('gulp-image-resize');

var path = {
  libs: ['bower_components/modernizr/modernizr.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/hevent/build/jquery.hevent.js'],
  imgSrc: 'public/media/source/*',
  imgDst: 'public/media/images/'
};

gulp.task('clean-image', function() {
  gulp.src('public/media/images/*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean-font', function() {
  gulp.src('public/media/font/', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('font', ['clean-font'], function() {
  gulp.src('bower_components/hiso-font/font/**', {base: './bower_components/hiso-font'})
    .pipe(gulp.dest('public/media/'));
});

gulp.task('lib', function() {
  gulp.src(path.libs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('public'))
    .pipe(notify('lib files updated'));
});

gulp.task('resize', ['clean-image'], function() {
  gulp.src(path.imgSrc)
    .pipe(resize({
      width: 294,
      quality: 0.8
    }))
    .pipe(rename(function(path) { path.basename = uslug(path.basename); }))
    .pipe(gulp.dest(path.imgDst))
});

gulp.task('default', function() {
  // place code for your default task here
});
