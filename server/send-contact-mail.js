import isEmail from 'validator/lib/isEmail.js'
import isEmpty from 'validator/lib/isEmpty.js'
import util from 'util'
import consola from 'consola'

import { sendMail } from './services/index.js'

const contactLogger = consola.withScope(`CONTACT`)

async function contactMail(formData) {
  // field validation
  const { email, message, name } = formData
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
    await sendMail(mailing)
  } catch (error) {
    contactLogger.log(
      util.inspect(error.response?.body ?? error, { colors: true }),
    )
    contactLogger.log(util.inspect(mailing, { colors: true }))
    return {
      validation,
      notification: {
        content: `an error as occurred while sending the mail. Please try again`,
        type: `error`,
      },
    }
  }
  return {
    validation,
    notification: { content: `message send`, type: `info` },
  }
}

export default contactMail
