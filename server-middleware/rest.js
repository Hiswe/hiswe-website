import util from 'util'
import bodyParser from 'body-parser'
import express from 'express'
import xml2js from 'xml2js'
import cheerio from 'cheerio'
import got from 'got'
import dotenv from 'dotenv'
import sendGrid from '@sendgrid/mail'
import isEmail from 'validator/lib/isEmail.js'
import isEmpty from 'validator/lib/isEmpty.js'
import consola from 'consola'

dotenv.config()
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
app.use(bodyParser.json())

//////
// BLOG POSTS
//////

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

//////
// SEND MAIL
//////

const contactLogger = consola.withScope(`CONTACT`)
app.post(`/contact`, async (req, res) => {
  // field validation
  const { email, message, name } = req.body
  const validation = {
    email: {
      valid: isEmail(email),
      value: email,
    },
    message: {
      valid: !isEmpty(message),
      value: message,
    },
  }
  const hasError = Object.values(validation)
    .map((field) => field.valid)
    .includes(false)
  if (hasError) {
    contactLogger.error(`validation error`)
    return {
      validation,
      notification: {
        content: `you need to fill the form`,
        type: `error`,
      },
    }
  }
  const mailing = {
    subject: `a new message from ${name}`,
    from: process.env.MAIL_FROM || `contact@hiswe.pouic`,
    to: process.env.MAIL_TO || `contact@hiswe.pouic`,
    replyTo: email,
    text: message,
  }
  try {
    // https://github.com/sendgrid/sendgrid-nodejs/blob/main/docs/use-cases/cc-bcc-reply-to.md
    await sendGrid.send(mailing)
    res.json({
      validation,
      notification: { content: `message send`, type: `info` },
    })
  } catch (error) {
    contactLogger.log(
      util.inspect(error.response?.body ?? error, { colors: true }),
    )
    contactLogger.log(util.inspect(mailing, { colors: true }))
    return res.json({
      validation,
      notification: {
        content: `an error as occurred while sending the mail. Please try again`,
        type: `error`,
      },
    })
  }
})

export default app
