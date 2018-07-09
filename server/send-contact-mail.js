import c from 'chalk'
import { isEmail, isEmpty } from 'validator'

import config from './config'
import { sendMail } from './services'

const PREFIX = `[MAIL]`

async function contactMail(formData) {
  const { email, message } = formData

  const validation = {
    email: isEmail(email),
    message: !isEmpty(message),
  }
  const hasError = Object.values(validation).includes(false)
  if (hasError) {
    console.log(c.red(PREFIX), `validation error`)
    return {
      validation,
      notification: {
        content: `you need to fill the form`,
        type: `error`,
      },
    }
  }
  try {
    await sendMail({
      from: config.email.options.from,
      to: config.email.options.from,
      replyTo: email,
      text: message,
    })
  } catch (error) {
    return {
      validation: {},
      notification: {
        content: `an error as occurred while sending the mail. Please try again`,
        type: `error`,
      },
    }
  }
  return {
    validation: {},
    notification: { content: `message send`, type: `info` },
  }
}

export default contactMail
