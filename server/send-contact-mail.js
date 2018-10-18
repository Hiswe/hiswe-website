import c from 'chalk'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import util from 'util'
import request from 'request-promise-native'
import consola from 'consola'

import config from './config'
import { sendMail } from './services'

const contactLogger = consola.withScope(`CONTACT`)
const reCAPTCHA_URL = `https://www.google.com/recaptcha/api/siteverify`

async function contactMail(formData) {
  // field validation
  const { email, message } = formData
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
    .map(field => field.valid)
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

  // re-captcha
  const captchaResponse = formData[`g-recaptcha-response`]
  if (!captchaResponse) {
    contactLogger.warn(`no captcha`)
    return {
      validation: validation,
      notification: {
        content: `a validation error has occurred. Please try again`,
        type: `error`,
      },
    }
  }

  const captchaData = {
    secret: config.captcha.secret,
    response: captchaResponse,
  }
  const verifyCaptcha = await request({
    method: `POST`,
    uri: reCAPTCHA_URL,
    formData: captchaData,
    json: true,
  })

  console.log(util.inspect(verifyCaptcha, { colors: true }))

  if (!verifyCaptcha.success) {
    return {
      validation: validation,
      notification: {
        content: `a validation error has occurred. Please try again`,
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
    console.log(util.inspect(error, { colors: true }))
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
