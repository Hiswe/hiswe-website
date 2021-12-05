import util from 'util'
import bodyParser from 'body-parser'
import express from 'express'
import xml2js from 'xml2js'
import cheerio from 'cheerio'
import got from 'got'

const app = express()
app.use(bodyParser.json())

const parseXml = util.promisify(xml2js.parseString)

function cleanSummary(summary) {
  const $ = cheerio.load(summary)
  $(`h2`).remove()
  $(`a`).each((index, element) => {
    const $link = $(element)
    const content = $link.html()
    $link.replaceWith(`<span>${content}</span>`)
  })
  return $(`body`).html().trim()
}

app.get(`/blog/posts`, async (req, res) => {
  const EMPTY_POSTS = { posts: [] }
  try {
    const atomResponse = await got(`https://hiswe.github.io/atom.xml`)
    const atomJS = await parseXml(atomResponse.body)
    const blogEntries = atomJS.feed?.entry
    if (!Array.isArray(blogEntries)) return res.send(EMPTY_POSTS)
    const posts = blogEntries.map((post) => {
      const link = post.link?.[0]?.$?.href
      const summary = post.summary?.[0]?._
      return {
        title: post.title?.[0],
        link: link,
        cover: `${link}cover.png`,
        published: post.published?.[0],
        summary: cleanSummary(summary),
      }
    })
    res.json({ posts })
  } catch (error) {
    res.send(EMPTY_POSTS)
  }
})

export default app
