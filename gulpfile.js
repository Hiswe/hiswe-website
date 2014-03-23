var gulp    = require('gulp');
var bump    = require('gulp-bump');
var exec    = require('gulp-exec');
var gutil   = require('gulp-util');
var clean   = require('gulp-rimraf');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var notify  = require('gulp-notify');
var resize  = require('gulp-image-resize');
var nodemon = require('gulp-nodemon');

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

gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
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

// gulp.task('server', function() {
//   gulp.src('')
//     .pipe(exec('nf start -j Procfile_dev -e .dev_env', function(err, stdout, stderr){
//         if(err) return console.log(err);
//         bower_list = stdout;
//         console.log(bower_list);
//         return done();
//     }));
// });

gulp.task('notify-restart', function () {
  gulp.src('').pipe(notify({title: 'Hiswe server', message: 'restart'}));
});

gulp.task('server', function () {
  nodemon({ script: 'server.js', ext: 'js coffee', watch: ['controllers/**/*'] })
    .on('restart', ['notify-restart'])
})

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
  gutil.log(gutil.colors.red('bump'), '  ', 'bump version of json');
  gutil.log(gutil.colors.red('font'), '  ', 'Copy fonts to the right folder');
  gutil.log(gutil.colors.red('lib'), '   ', 'Concat & uglify libs');
  gutil.log(gutil.colors.red('resize'), '', 'Resize images');
  gutil.log(gutil.colors.red('server'), '', 'Restart server');
});
