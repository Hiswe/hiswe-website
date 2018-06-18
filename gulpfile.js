'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const slugify = require('@sindresorhus/slugify')
const browserSync = require(`browser-sync`).create()

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
    .pipe($.cleanCss())
    .pipe($.rename({ suffix: `.min` }))
    .pipe(gulp.dest(`server/public`))
}
css.description = `compile SCSS to CSS`

gulp.task(`css`, css)

////////
// ICONS
////////

const icons = () => {
  return (
    gulp
      .src(`assets/icons/*.svg`)
      // We need to move <clipPath> and <Mask> to the defs…
      // …in order for Firefox to render the SVG correctly
      .pipe(
        $.cheerio({
          run: ($, file) => {
            // console.log(Object.keys(file))
            $(`rect[style="fill:none;"]`).remove()

            const $clipPath = $(`clipPath`)
            const hasClipPath = $clipPath.length > 0
            if (!hasClipPath) return

            let $defs = $(`defs`)
            const hasDefs = $defs.length > 0
            const fileName = slugify(file.basename.replace(file.extname, ``))
            if (!hasDefs) {
              $defs = $(`<defs></defs>`)
              $defs.prependTo(`svg`)
            }
            function copyToDefs(i, el) {
              const $el = $(el)
              const $clone = $el.clone()
              const oldId = $el.attr(`id`)
              const id = `${fileName}-${oldId}`
              $clone.attr(`id`, id)
              $(`[clip-path="url(#${oldId})"]`).attr(`clip-path`, `url(#${id})`)
              // const clip-path="url(#_clip1)"
              $clone.appendTo($defs)
              $el.remove()
            }
            $clipPath.each(copyToDefs)
            // if (hasMask) $mask.each(copyToDefs)
          },
          parserOptions: {
            xmlMode: true,
          },
        })
      )
      .pipe(
        $.svgSymbols({
          id: `icon-%f`,
          class: `.icon-%f`,
          fontSize: 16,
          templates: [`default-sass`, `default-svg`, `default-demo`],
          svgAttrs: {
            class: `svg-icon-lib`,
          },
          slug: slugify,
        })
      )
      .pipe($.if(/[.]svg$/, gulp.dest(`server/views`)))
      .pipe($.if(/[.]scss$/, gulp.dest(`front/scss`)))
      .pipe($.if(/[.]html$/, gulp.dest(`assets/icons`)))
  )
}
css.description = `bundle all SVG icons`

gulp.task(`icons`, icons)

////////
// DEV
////////

const reload = done => {
  browserSync.reload()
  done()
}

const nodemon = require('nodemon')
const nodemonConfig = require('./nodemon.json')

const build = gulp.series(icons, css)

gulp.task(`build`, build)

const watch = done => {
  gulp.watch(`front/scss/*.scss`, css)
  gulp.watch(`assets/icons/*.svg`, icons)
  gulp.watch(`server/views/*.pug`, reload)
  gulp.watch(`server/content/*.md`, reload)
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
