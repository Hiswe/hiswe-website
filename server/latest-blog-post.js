'use strict'

import util from 'util'
import axios from 'axios'
import _ from 'lodash'
import xml2js from 'xml2js'
import cheerio from 'cheerio'

const parseXml = util.promisify(xml2js.parseString)

function cleanSummary(summary) {
  const $ = cheerio.load(summary)
  $(`h2`).remove()
  $(`a`).each((index, element) => {
    const $link = $(element)
    const content = $link.html()
    $link.replaceWith(`<span>${content}</span>`)
  })
  return $(`body`)
    .html()
    .trim()
}

export default async function getLatestBlogPost() {
  const atomResponse = await axios.get(`https://hiswe.github.io/atom.xml`)
  if (!atomResponse.status === 200) return (ctx.body = [{}])

  const atomJS = await parseXml(atomResponse.data)
  const blogEntries = _.get(atomJS, `feed.entry`)
  if (!Array.isArray(blogEntries)) return (ctx.body = [{}])

  return blogEntries.map(post => {
    const link = _.get(post, `link[0].$.href`)
    const summary = _.get(post, `summary[0]._`)
    return {
      title: _.get(post, `title[0]`),
      link: link,
      cover: `${link}cover.png`,
      published: _.get(post, `published[0]`),
      summary: cleanSummary(summary),
    }
  })
}
