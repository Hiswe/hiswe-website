import * as path from 'path'
import { fileURLToPath } from 'url'
import slugify from '@sindresorhus/slugify'
import yargs from 'yargs'
import gulp from 'gulp'
import gulpBump from 'gulp-bump'
import gulpSvgmin from 'gulp-svgmin'
import gulpCheerio from 'gulp-cheerio'
import gulpSvgSymbols from 'gulp-svg-symbols'
import gulpIf from 'gulp-if'
import gulpRename from 'gulp-rename'

const args = yargs.argv
const __dirname = path.dirname(fileURLToPath(import.meta.url))

////////
// BUMP
////////

export const bump = done => {
  if (!args.to) {
    console.log(chalk.red(`bump task needs the --to argument`))
    return done()
  }
  const isVersion = /\d+\.\d+\.\d+/.test(args.to)
  return gulp
    .src([`package.json`], { base: '.' })
    .pipe(gulpBump(isVersion ? { version: args.to } : { type: args.to }))
    .pipe(gulp.dest(`.`))
}
bump.description = `bump to the --to=`

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

export const buildLogos = () => {
  return gulp
    .src(`nuxt-assets-source/logos-tech/*.svg`)
    .pipe(
      gulpSvgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      gulpCheerio({
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
      gulpSvgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      gulpSvgSymbols({
        class: `.logo--%f`,
        templates: [`default-demo`, templateVue],
        slug: slugify,
        svgAttrs: {
          class: `logo`,
        },
      })
    )
    .pipe(gulpRename({ basename: `svg-tech-logos` }))
    .pipe(gulpIf(/[.]vue$/, gulp.dest(`nuxt-components`)))
    .pipe(gulpIf(/[.]html$/, gulp.dest(`nuxt-assets-source/logos-tech`)))
}
buildLogos.description = `bundle svg logos`

//----- ICONS

const MATERIAL_NAME = /(?:outline|baseline)-([^\d]*)-24px/
const buildVueIcons = () => {
  return gulp
    .src(`nuxt-assets-source/icons/*.svg`)
    .pipe(
      gulpRename(path => {
        const { basename } = path
        const isMaterialIcon = MATERIAL_NAME.test(basename)
        if (!isMaterialIcon) return
        path.basename = MATERIAL_NAME.exec(basename)[1].replace(/_/g, `-`)
      })
    )
    .pipe(gulpCheerio(cheerioOptions))
    .pipe(
      gulpSvgSymbols({
        class: `.icon--%f`,
        templates: [`default-demo`, templateVue],
        slug: slugify,
        svgAttrs: {
          class: `icon`,
        },
      })
    )
    .pipe(gulpIf(/[.]vue$/, gulp.dest(`nuxt-components`)))
    .pipe(gulpIf(/[.]html$/, gulp.dest(`nuxt-assets-source/icons`)))
}
buildVueIcons.description = `bundle all SVG icons`

//----- ALL

const buildSvg = gulp.parallel(buildLogos, buildVueIcons)
gulp.task(`build:svg`, buildSvg)
