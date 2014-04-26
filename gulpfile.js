'use strict';

var fs          = require('fs');
var rev         = require('gulp-rev');
var gulp        = require('gulp');
var args        = require('yargs').argv;
var conf        = require('./gulp-config.js');
var bump        = require('gulp-bump');
var gutil       = require('gulp-util');
var clean       = require('gulp-clean');
var uslug       = require('uslug');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var notify      = require('gulp-notify');
var gulpif      = require('gulp-if');
var concat      = require('gulp-concat');
var replace     = require('gulp-replace');
var plumber     = require('gulp-plumber');
// css
var stylus      = require('gulp-stylus');
var minifyCSS   = require('gulp-minify-css');
// browserify js
var source      = require('vinyl-source-stream');
var coffeeify   = require('coffeeify');
var streamify   = require('gulp-streamify');
var browserify  = require('browserify');
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

/////////
// CONF
/////////

var server = lr();

var stylusVar   = require('./config/datas/stylus-var.json');
stylusVar.isDev = true;

// Plumber error callback
var onError = function onError(err) {
  gutil.beep();
  console.log(err);
};

/////////
// VERSIONS
/////////

// TODO: should be done with arguments
gulp.task('patch', function () {
  return gulp.src(conf.pack).pipe(bump()).pipe(gulp.dest('./'));
});

gulp.task('minor', function() {
  return gulp.src(conf.pack).pipe(bump({type:'minor'})).pipe(gulp.dest('./'));
});

gulp.task('major', function() {
  return gulp.src(conf.pack).pipe(bump({type:'major'})).pipe(gulp.dest('./'));
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
    .pipe(replace(conf.css.replace.fontawesome, 'url(\'./media/font/$2'))
    .pipe(gulp.dest('./public'))
    .pipe(rename('index.min.css'))
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(conf.css.dst))
    .pipe(notify({title: 'HISWE', message: 'CSS build done'}));
});

gulp.task('css', ['stylus'], function() {
  gulp.src(conf.revFiles)
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest(conf.datas))
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
  var message =  [
    'Don\'t forget to build ./bower_components/PointerGestures',
    'cd ./bower_components/PointerGestures && npm install && grunt'
  ].join('\n');
  gutil.log(gutil.colors.yellow(message));
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

gulp.task('js', ['lib', 'frontend-app'], function() {
  gulp.src(conf.revFiles)
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest(conf.datas))
    .pipe(livereload(server));
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
// IMAGES
/////////

// Can't use gulp-if because gulp-resize don't rely on stream
//TODO: May have a workaround with gulp-streamify
gulp.task('clean-pixel', function() {
  return gulp.src(conf.img.cleanPixel, {read: false}).pipe(clean());
});

gulp.task('pixel', ['clean-pixel'], function() {
  return gulp.src(conf.img.pixel)
    .pipe(resize({height: conf.img.height, quality: 1}))
    .pipe(resize({width: conf.img.width, quality: 0.8}))
    .pipe(rename(function(path) { path.basename = uslug(path.basename, conf.uslug); }))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-splash', function() {
  return gulp.src(conf.img.cleanPixel, {read: false}).pipe(clean());
});

gulp.task('splash', ['clean-splash'], function() {
  return gulp.src(conf.img.pixel)
    .pipe(rename(function(path) { path.basename = uslug(path.basename, conf.uslug); }))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-svg', function() {
  return gulp.src(conf.img.cleanSvg, {read: false}).pipe(clean());
});

gulp.task('svg', ['clean-svg'], function() {
  return gulp.src(conf.img.svg)
    .pipe(svgmin())
    .pipe(rename(function(path) { path.basename = uslug(path.basename, conf.uslug); }))
    .pipe(gulp.dest(conf.img.dst));
});

gulp.task('list', function(cb) {
  var projectName = args.project;
  if (projectName != null) {
    var fileList = fs.readdirSync(conf.img.fullDst)
      .filter(function (item) { return item.indexOf(projectName) > -1 })
      .map(function (item) { return '- ![](media/images/' + item + ' "" )'; });
    console.log(fileList.join('\n'));
  } else {
    gutil.log('You shoul call ', gutil.colors.yellow('gulp list --project NAME'));
  }
  cb(null);
});

gulp.task('image', ['pixel', 'splash', 'svg']);
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

// JSON
gulp.task('json', require('./gulp-data.js'));

/////////
// BUILD ALL
/////////

gulp.task('build', ['frontend-app', 'lib', 'stylus', 'json'], function() {
  return gulp.src(conf.revFiles)
  .pipe(rev())
  .pipe(gulp.dest('public'))
  .pipe(rev.manifest())
  .pipe(gulp.dest(conf.datas))
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
  console.log(gutil.colors.red('patch'), '              ', 'patch version of json');
  console.log(gutil.colors.red('minor'), '              ', 'minor version of json');
  console.log(gutil.colors.red('major'), '              ', 'major version of json');
  console.log(gutil.colors.red('font'), '               ', 'Copy fonts to the right folder');
  console.log(gutil.colors.red('js'), '                 ', 'Concat & uglify + rev');
  console.log(gutil.colors.red('css'), '                ', 'Compile stylus + uglify + rev');
  console.log(gutil.colors.red('json'), '               ', 'Package all datas to json');
  console.log(gutil.colors.red('build'), '              ', 'js + css + rev');
  console.log(gutil.colors.red('pixel'), '              ', 'Resize pixel images');
  console.log(gutil.colors.red('svg'), '                ', 'clean svg images');
  console.log(gutil.colors.red('image'), '              ', 'pixel + svg');
  console.log(gutil.colors.red('list --project name'), '', 'list image of a current project');
  console.log(gutil.colors.red('start'), '              ', 'Watch + server');
});
