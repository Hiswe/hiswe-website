'use strict'

const _ = require('lodash')
const path = require('path')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const slugify = require('@sindresorhus/slugify')
const md = require('markdown-it')({
  html: true,
})

const tocRegex = /<!--\sSTART[\w\W\n]*\s<!--\sEND[\w\s]*-->/
function removeTableOfContent(markdown) {
  return markdown.replace(tocRegex, ``)
}

const svgIcon = /^\/assets\/icons\/([^\.]*)\.svg$/
function replaceSvgImageWithSymbols(html) {
  const $ = cheerio.load(html)
  const $images = $(`img`)
  if (!$images.length) return html

  $images.each((index, el) => {
    const $img = $(el)
    const src = $img.attr(`src`)
    if (!svgIcon.test(src)) return

    const svgName = `icon-${slugify(svgIcon.exec(src)[1])}`
    $img.replaceWith(`
      <svg role="img" class="${svgName}">
        <use xlink:href="#${svgName}"></use>
      </svg>
    `)
  })
  return $.html()
}

const renderMarkdown = _.flow(
  removeTableOfContent,
  md.render.bind(md),
  replaceSvgImageWithSymbols
)

module.exports = async function getMarkdown(name) {
  const markdownPath = path.join(__dirname, `./content/${name}.md`)
  const markdownContent = await fs.readFile(markdownPath, `utf8`)
  const html = renderMarkdown(markdownContent)
  return html
}
