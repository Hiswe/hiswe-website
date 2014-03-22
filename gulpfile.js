var gulp    = require('gulp');
var clean   = require('gulp-rimraf');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var notify  = require('gulp-notify');

var libs = ['bower_components/modernizr/modernizr.js',
  'bower_components/jquery/jquery.js',
  'bower_components/hevent/build/jquery.hevent.js']


gulp.task('lib', function() {
  gulp.src(libs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('public'))
    .pipe(notify('lib files updated'));
});


gulp.task('clean-font', function() {
  gulp.src('public/media/font/', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('font', ['clean-font'], function() {
  gulp.src('bower_components/hiso-font/font/**', {base: './bower_components/hiso-font'})
    .pipe(gulp.dest('public/media/'));
});

gulp.task('resize', function() {

});

gulp.task('default', function() {
  // place code for your default task here
});