'use strict'

const path = require('path')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const slugify = require('@sindresorhus/slugify')
const md = require('markdown-it')({
  html: true,
})

const svgIcon = /^\/assets\/icons\/([^\.]*)\.svg$/
const { html_inline } = md.renderer.rules
// replace any assets/icons with a SVG symbol
md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const $ = cheerio.load(token.content)
  const $images = $(`img`)
  if (!$images.length) return html_inline(tokens, idx, options, env, self)

  $images.each((index, el) => {
    const $img = $(el)
    const src = $img.attr(`src`)
    if (!svgIcon.test(src)) return

    const svgName = `icon-${slugify(svgIcon.exec(src)[1])}`
    $images.replaceWith(`
      <svg role="img" class="${svgName}">
        <use xlink:href="#${svgName}"></use>
      </svg>
    `)
  })
  return $.html()
}

const tocRegex = /<!--\sSTART[\w\W\n]*\s<!--\sEND[\w\s]*-->/
module.exports = async function getMarkdown(name) {
  const markdownPath = path.join(__dirname, `./content/${name}.md`)
  const markdownContent = await fs.readFile(markdownPath, `utf8`)
  // remove TOC
  const html = md.render(markdownContent.replace(tocRegex, ''))
  return html
}
