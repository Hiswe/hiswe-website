'use strict'

const util = require('util')
const axios = require('axios')
const _ = require('lodash')
const xml2js = require('xml2js')

const parseXml = util.promisify(xml2js.parseString)

module.exports = async function getLatestBlogPost() {
  const atomResponse = await axios.get(`https://hiswe.github.io/atom.xml`)
  if (!atomResponse.status === 200) return (ctx.body = [{}])

  const atomJS = await parseXml(atomResponse.data)
  const blogEntries = _.get(atomJS, `feed.entry`)
  if (!Array.isArray(blogEntries)) return (ctx.body = [{}])

  return blogEntries.map(post => {
    return {
      title: _.get(post, `title[0]`),
      link: _.get(post, `link[0].$.href`),
      published: _.get(post, `published[0]`),
      summary: _.get(post, `summary[0]._`),
    }
  })
}
