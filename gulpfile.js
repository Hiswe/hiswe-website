'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const slugify = require('@sindresorhus/slugify')

////////
// ICONS
////////

//----- UTILS

const cleanSvg = ($, file) => {
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
}

const cheerioOptions = {
  run: cleanSvg,
  parserOptions: {
    xmlMode: true,
  },
}

//----- LOGOS

const cleanLogos = () => {
  return gulp
    .src(`nuxt-assets-source/logos/*.svg`)
    .pipe($.cheerio(cheerioOptions))
    .pipe(
      $.svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(gulp.dest(`nuxt-assets/logos`))
}
cleanLogos.description = `just clean the logos…`
exports[`build:logos`] = cleanLogos

//----- ICONS

const templateVue = path.join(
  __dirname,
  `./nuxt-assets-source/icons/svg-icons.vue`
)
const vueIcons = () => {
  return gulp
    .src(`nuxt-assets-source/icons/*.svg`)
    .pipe($.cheerio(cheerioOptions))
    .pipe(
      $.svgSymbols({
        // id: `icon-%f`,
        class: `.icon--%f`,
        fontSize: 16,
        templates: [`default-demo`, templateVue],
        slug: slugify,
        svgAttrs: {
          class: `icon`,
        },
      })
    )
    .pipe($.if(/[.]vue$/, gulp.dest(`nuxt-components`)))
    .pipe($.if(/[.]html$/, gulp.dest(`nuxt-assets-source/icons`)))
}
vueIcons.description = `bundle all SVG icons`
exports[`build:icons`] = vueIcons

//----- ALL

const buildSvg = gulp.parallel(cleanLogos, vueIcons)
gulp.task(`build:svg`, buildSvg)

////////
// ToC MARKDOWN
////////

const tableOfContent = () => {
  return gulp
    .src(`server/content/*.md`)
    .pipe($.cached(`toc`))
    .pipe($.doctoc())
    .pipe(gulp.dest(`server/content`))
}
tableOfContent.description = `build content md ToC`

exports[`build:toc`] = tableOfContent
