'use strict';

require('coffee-script/register');

var fs          = require('fs');
var gp          = require('gulp-load-plugins')();
var ini         = require('ini');
var gulp        = require('gulp');
var path        = require('path');
var exec        = require('child_process').exec;
var args        = require('yargs').argv;
var conf        = require('./gulp-config.js');
var runsequence = require('run-sequence');
// browserify js
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
// server
var lr          = require('tiny-lr'); // livereload depend on tiny-lr
// misc
var bundleData  = require('./gulp-task/hiswe-bundle-data');
var svgSymbols  = require('./gulp-task/hiswe-svg-symbols');

/////////
// CONF & MISC
/////////

var server = lr();

// Plumber error callback
var onError = function onError(err) {
  gp.util.beep();
  console.log(err);
};

gulp.task('bump', function () {
  if (args.minor) return gulp.src(conf.pack).pipe(gp.bump({type:'minor'})).pipe(gulp.dest('./'));
  if (args.major) return gulp.src(conf.pack).pipe(gp.bump({type:'minor'})).pipe(gulp.dest('./'));
  return gulp.src(conf.pack).pipe(gp.bump()).pipe(gulp.dest('./'));
});

gulp.task('rev', function () {
  gulp.src(conf.rev.src)
    .pipe(gp.if( /[.]css$/, gp.minifyCss({keepSpecialComments: 0})))
    // streamify is for handling browserify stream
    .pipe(gp.if( /[.]js$/, gp.streamify(gp.uglify({mangle: false}))))
    // no rename as the rev hash do this
    .pipe(gp.rev())
    .pipe(gulp.dest(conf.rev.dst))
    .pipe(gp.rev.manifest())
    .pipe(gulp.dest(conf.db.dst))
    .pipe(gp.livereload(server));
});

gulp.task('tag', function (callback) {
  var pkg     = require('./package.json');
  var v       = 'v' + pkg.version;
  var message = (args.m == null)? 'Release ' + v : 'Release ' + v  + ' – ' + args.m;
  console.log('git ci -am "' + message + '"');
  console.log('git tag -a ' + pkg.version + ' -m "' + message + '"');
  console.log('git push --tags');
  callback();
});

gulp.task('heroku', function(cb){
  function execCb(err, stdout, stderr) {
    console.log(conf.heroku.format(stdout, args));
    return cb(err);
  }
  if (args.config)  exec('heroku config:pull --app hiswe', execCb);
  if (args.log)     exec('heroku logs -n 1000 --app hiswe', execCb);
});

gulp.task('ini', function(cb){
  var config = ini.parse(fs.readFileSync('./.hiswerc', 'utf-8'));
  for (var key in config)
    console.log('heroku config:set hiswe_'+key+'='+config[key]+' --app hiswe');
  cb();
});

// Upload to Amazon S3
gulp.task('upload', function () {
  var publisher = gp.awspublish.create({
    key:    conf.rc.AWS_ACCESS_KEY_ID,
    secret: conf.rc.AWS_SECRET_KEY,
    bucket: conf.rc.AWS_BUCKET
  });

  return gulp.src( ['public/app-*.js', 'public/vendor-*.js', 'public/index-*.css', '!public/media/font/*','!public/media/icons/*', 'public/*/*/*'])
    .pipe(publisher.publish())
    .pipe(publisher.cache())
    .pipe(publisher.sync()) // delete not-in-folder files
    .pipe(gp.awspublish.reporter())
    .pipe(gp.notify({title: 'HISWE', message: 'UPLOAD done', onLast: true}));
});

/////////
// CSS
/////////

gulp.task('stylus', ['clean-css'], function () {
  return gulp.src(conf.css.src)
    .pipe(gp.plumber({errorHandler: onError}))
    .pipe(gp.if(/[.]styl$/, gp.stylus({
      use: [require('nib')(), require('hstrap')()],
      define: require('./shared/stylus-var-css'),
      set:['resolve url']
    })))
    .pipe(gp.plumber.stop())
    .pipe(gp.concat('index.css'))
    .pipe(gp.replace(conf.css.replace.hisoFont, '$1./media/font/$2'))
    .pipe(gulp.dest(conf.css.dst))
    .pipe(gp.notify(conf.msg('CSS build done')));
});

gulp.task('css', function(callback) {
  return runsequence('stylus', 'rev', callback);
});

gulp.task('clean-css', function() {
  return gulp.src('public/*.css', {read: false}).pipe(gp.clean());
});

/////////
// JS
/////////

// LIBRARY

gulp.task('vendor', ['clean-vendor'], function () {
  var bundleStream = browserify({
      basedir: __dirname,
      noParse: conf.js.vendor.noParse
    })
    .require('wolfy87-eventemitter', {expose: 'eventEmitter'})
    .require('./gulp-task/browsernizr-conf.js', {expose: 'conf'})
    .require(conf.js.vendor.require)
    .transform('deglobalify')
    .bundle({
      detectGlobals: false
    }).on('error', onError);

  return bundleStream
    .pipe(source('vendor.js'))
    .pipe(gulp.dest(conf.public))
    .pipe(gp.livereload(server))
    .pipe(gp.notify(conf.msg('Vendor build done')));
});

gulp.task('clean-vendor', function() { return gulp.src(conf.js.vendor.clean, {read: false}).pipe(gp.clean()); });

// FRONT-END APP
gulp.task('clean-app', function() { return gulp.src(conf.js.front.clean, {read: false}).pipe(gp.clean());});

gulp.task('front-lint', function(){
  return gulp.src(conf.js.front.src)
    .pipe(gp.coffeelint(conf.lint))
    .pipe(gp.coffeelint.reporter())
    .pipe(gp.coffeelint.reporter('fail'));
});

gulp.task('bundle-front', ['clean-app'], function() {
  // see https://github.com/hughsk/vinyl-source-stream example
  var bundleStream = browserify({
      entries: conf.js.front.src,
      basedir: conf.basedir,
      extensions: ['.js', '.json', '.coffee', '.jade']
    })
    .transform(require('coffeeify'))
    .transform(require('jadeify'))
    .external(conf.js.front.external)
    .bundle();

  return bundleStream
    .pipe(gp.plumber({errorHandler: onError}))
    .pipe(source(conf.basedir + '/boot.coffee'))
    .pipe(gp.rename('app.js'))
    .pipe(gulp.dest(conf.public))
    .pipe(gp.notify(conf.msg('FRONTEND APP build done')))
    .pipe(gp.livereload(server));
});

gulp.task('front-app', function(callback) {
  return runsequence('front-lint', 'bundle-front', 'rev', callback);
});

gulp.task('js', function(callback) {
  return runsequence('front-lint', ['vendor', 'bundle-front'], 'rev', callback);
});

/////////
// ASSETS
/////////

// FONT
gulp.task('clean-font', function() { return gulp.src(conf.font.dst, {read: false}).pipe(gp.clean()); });

gulp.task('font', ['clean-font'], function() {
  gulp.src(conf.font.src)
    .pipe(gulp.dest(conf.font.dst));
});

// ICONS
gulp.task('icons', function() {
  return gulp.src(conf.icons.src)
    .pipe(gp.rename(conf.icons.rename))
    .pipe(svgSymbols({
      svgId:      'icon-%f',
      className:  '.svgicon-%f'
    }))
    .pipe(gp.rename(conf.icons.renameDst))
    .pipe(gp.if( /[.]svg$/, gulp.dest(conf.icons.svgDst)))
    .pipe(gp.if( /[.]css$/, gulp.dest(conf.icons.cssDst)));
});

/////////
// IMAGES
/////////

// Can't use gulp-if because gulp-resize don't rely on stream
// TODO: May have a workaround with gulp-streamify
gulp.task('clean-pixel', function() {
  return gulp.src(conf.img.cleanPixel, {read: false}).pipe(gp.clean());
});

gulp.task('pixel', ['clean-pixel'], function() {
  return gulp.src(conf.img.pixel)
    .pipe(gp.rename(conf.img.formatOriginal))
    .pipe(gulp.dest(conf.img.dst))
    .pipe(gp.imageResize({height: conf.img.height, quality: 1}))
    .pipe(gp.imageResize({width: conf.img.width, quality: 1}))
    .pipe(gp.rename(conf.img.formatPreview))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-cover', function() {
  return gulp.src(conf.img.cleanCover, {read: false}).pipe(gp.clean());
});

gulp.task('cover', ['clean-cover'], function() {
  return gulp.src(conf.img.cover)
    .pipe(gp.rename(conf.img.formatOriginal))
    .pipe(gp.imageResize({width: conf.img.coverWidth, quality: 1}))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-splash', function() {
  return gulp.src(conf.img.cleanPixel, {read: false}).pipe(gp.clean());
});

gulp.task('splash', ['clean-splash'], function() {
  return gulp.src(conf.img.pixel)
    .pipe(gp.rename(conf.img.formatOriginal))
    .pipe(gulp.dest(conf.img.dst))
    .pipe(gp.rename(conf.img.formatPreview))
    .pipe(gulp.dest(conf.img.dst))
});

gulp.task('clean-svg', function() {
  return gulp.src(conf.img.cleanSvg, {read: false}).pipe(gp.clean());
});

gulp.task('svg', ['clean-svg'], function() {
  return gulp.src(conf.img.svg)
    .pipe(gp.svgmin())
    .pipe(gp.rename(conf.img.formatOriginal))
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
    gp.util.log('You should call ', gp.util.colors.yellow('gulp list --project NAME'));
  }
  cb(null);
});

gulp.task('image', ['pixel', 'splash', 'svg', 'cover']);
gulp.task('resize', ['image']); // Aliase because I just often mess around

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
  if (args.js != null)      return runsequence('front-lint', ['vendor', 'bundle-front'], 'rev', callback);
  if (args.lib != null)     return runsequence('vendor', 'rev', callback);
  if (args.css != null)     return runsequence('stylus', 'rev', callback);
  if (args.front != null)   return runsequence('front-lint', 'bundle-front', 'rev', callback);
  if (args.image === false) return runsequence('front-lint', ['bundle-front', 'vendor', 'stylus'], 'rev', callback);
  return runsequence('front-lint', ['icons', 'bundle-front', 'vendor', 'stylus', 'resize'], ['rev', 'json'], callback);
});

/////////
// SERVER
/////////

gulp.task('server-lint', function(){
  return gulp.src(conf.server.src)
    .pipe(gp.coffeelint(conf.lint))
    .pipe(gp.coffeelint.reporter())
    .pipe(gp.coffeelint.reporter('fail'));
});

gulp.task('open-browser', function (){
  // Has to be a file in order to proceed…
  return gulp.src('./README.md').pipe(gp.wait(1000)).pipe(gp.open('', {url: "http://localhost:5000"}));
});

gulp.task('notify-restart', function () {
  // wait server to properly restart
  setTimeout(function() {
    gulp.src('').pipe(gp.notify(conf.msg('restart server')));
    server.changed({body: {files: ['index.html']}});
  }, 1000);
});

// Watch
gulp.task('watch', function() {
  server.listen(35729, function (err) { if (err) { return console.log(err) }});
  gulp.watch(['./front/css/**/*.styl'], ['css']);
  gulp.watch(['./front/js/**/*.coffee'], ['front-app']);
  gulp.watch(['./server/datas/*.md'], ['json']);
  gulp.watch(['./server/**/*.coffee'], ['server-lint']);
  gulp.watch('./views/**/*.jade').on('change', function() {
    gulp.src('').pipe(gp.notify(conf.msg('reload html')));
    server.changed({body: {files: ['index.html']}});
  });
});

// Nodemon server
gulp.task('express', ['server-lint'], function () {
  var env   = args.prod ? 'production' : 'development';
  var glob  = ['server/**/*.coffee', 'server/datas/db-*.json'];
  // ignore rev-manifest.json in dev mode
  if (env === 'production') glob.push('server/datas/rev-manifest.json')
  gp.nodemon({
    script: 'server.js', ext: 'coffee json', watch: glob,
    env: { 'NODE_ENV': env, 'hiswe_pouic': 'clapou'}
  })
  .on('restart', ['notify-restart'])
  .on('crash', onError);
});

gulp.task('server', function (callback){
  if (args.build != null) return runsequence(['watch', 'express'], 'open-browser', callback);
  return runsequence('build', ['watch', 'express'], 'open-browser', callback);
});

/////////
// DOC
/////////

gulp.task('doc', function(callback) {
  var m = gp.util.colors.magenta
  var g = gp.util.colors.grey
  console.log(m('bump'), g('..............'), 'patch version of json');
  console.log(m('  --minor'), g('.........'), 'minor version of json');
  console.log(m('  --major'), g('.........'), 'major version of json');
  console.log(m('ini'), g('...............'), 'Parse .hiswerc to have the heroku commands to set the env vars');
  console.log(m('heroku'), g('............'), 'Heroku related task');
  console.log(m('  --config'), g('........'), 'get heroku current conf');
  console.log(m('  --log'), g('...........'), 'get last 1000 log');
  console.log(m('rev'), g('...............'), 'Generate rev files');
  console.log(m('font'), g('..............'), 'Copy fonts to the right folder');
  console.log(m('json'), g('..............'), 'Package all datas to json');
  console.log(m('build'), g('.............'), 'js + css + rev');
  console.log(m('  --js'), g('............'), 'Concat & uglify all js + rev');
  console.log(m('  --lib'), g('...........'), 'Concat & uglify lib + rev');
  console.log(m('  --css'), g('...........'), 'Compile stylus + uglify + rev');
  console.log(m('  --front'), g('.........'), 'Concat & uglify front-end app + rev');
  console.log(m('  --no-image'), g('......'), 'build everything except images');
  console.log(m('icons'), g('.............'), 'build icon svg files');
  console.log(m('pixel'), g('.............'), 'Resize pixel images');
  console.log(m('svg'), g('...............'), 'clean svg images');
  console.log(m('image'), g('.............'), 'pixel + svg');
  console.log(m('upload'), g('............'), 'upload assets to AWS');
  console.log(m('list'), g('..............'), 'list image');
  console.log(m('  --project name'), g('..'), 'of a specific project');
  console.log(m('server'), g('............'), 'Watch + server');
  console.log(m('  --no-build'), g('......'), 'Skip the build');
  console.log(m('  --prod'), g('..........'), 'Set environment to production');
  callback();
});

gulp.task('default', ['doc']);
