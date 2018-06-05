'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

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
}

gulp.task(`css`, css)
