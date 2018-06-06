'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const browserSync = require(`browser-sync`).create()
const reload = browserSync.reload

////////
// CSS
////////

const autoprefixer = require('autoprefixer')

const css = () => {
  return gulp
    .src(`front/scss/index.scss`)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.postcss([autoprefixer()]))
    .pipe($.rename(`hiswe.css`))
    .pipe(gulp.dest(`server/public`))
    .pipe(browserSync.stream())
}

gulp.task(`css`, css)

////////
// DEV
////////

const nodemon = require('nodemon')
const nodemonConfig = require('./nodemon.json')

const build = css

gulp.task(`build`, build)

const watch = done => {
  gulp.watch(`front/scss/*.scss`, css)
  gulp.watch(`server/views/*.pug`, reload)
  done()
}

const nodemonServer = done => {
  nodemon(nodemonConfig).once(`start`, done)
}

const browserSyncServer = done => {
  browserSync.init({
    proxy: `http://localhost:3456`,
    open: false,
    port: 7000,
    ghostMode: false,
  })
  done()
}

gulp.task(
  `dev`,
  gulp.series(build, gulp.parallel(watch, nodemonServer), browserSyncServer)
)
