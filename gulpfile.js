'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const slugify = require('@sindresorhus/slugify')
const args = require('yargs').argv

////////
// BUMP
////////

const bump = done => {
  if (!args.to) {
    console.log(chalk.red(`bump task needs the --to argument`))
    return done()
  }
  const isVersion = /\d+\.\d+\.\d+/.test(args.to)
  return gulp
    .src([`package.json`], { base: '.' })
    .pipe($.bump(isVersion ? { version: args.to } : { type: args.to }))
    .pipe(gulp.dest(`.`))
}
bump.description = `bump to the --to=`
exports[`bump`] = bump

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

const templateVue = path.join(
  __dirname,
  `./nuxt-assets-source/icons/svg-icons.vue`
)

const logos = () => {
  return gulp
    .src(`nuxt-assets-source/logos-tech/*.svg`)
    .pipe(
      $.svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      $.cheerio({
        run: ($, file) => {
          $(`defs`).remove()
          $(`clipPath`).remove()
          $(`path[d="M0 0h105v70H0z"]`).remove()
          $(`path[d="M0 0h70v70H0z"]`).remove()
          const $group = $(`g`)
          const $content = $group.html()
          $group.replaceWith($content)
          $(`path[fill="#fff"]`)
            .attr(`fill`, ``)
            .addClass(`logo-path-white`)
          $(`path[fill="#ccc"]`)
            .attr(`fill`, ``)
            .addClass(`logo-path-light`)
          $(`path[fill="#999"]`)
            .attr(`fill`, ``)
            .addClass(`logo-path-background`)
          $(`svg`).attr({
            'fill-rule': ``,
            'clip-rule': ``,
            'stroke-linejoin': ``,
            'stroke-miterlimit': ``,
          })
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(
      $.svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      $.svgSymbols({
        class: `.logo--%f`,
        templates: [`default-demo`, templateVue],
        slug: slugify,
        svgAttrs: {
          class: `logo`,
        },
      })
    )
    .pipe($.rename({ basename: `svg-tech-logos` }))
    .pipe($.if(/[.]vue$/, gulp.dest(`nuxt-components`)))
    .pipe($.if(/[.]html$/, gulp.dest(`nuxt-assets-source/logos-tech`)))
}
logos.description = `bundle svg logos`
exports[`build:logos`] = logos

//----- ICONS

const MATERIAL_NAME = /(?:outline|baseline)-([^\d]*)-24px/
const vueIcons = () => {
  return gulp
    .src(`nuxt-assets-source/icons/*.svg`)
    .pipe(
      $.rename(path => {
        const { basename } = path
        const isMaterialIcon = MATERIAL_NAME.test(basename)
        if (!isMaterialIcon) return
        path.basename = MATERIAL_NAME.exec(basename)[1].replace(/_/g, `-`)
      })
    )
    .pipe($.cheerio(cheerioOptions))
    .pipe(
      $.svgSymbols({
        class: `.icon--%f`,
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

const buildSvg = gulp.parallel(logos, vueIcons)
gulp.task(`build:svg`, buildSvg)
