import util from 'util'
import bodyParser from 'body-parser'
import express from 'express'
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
