import util from 'util'
import consola from 'consola'

import config from '../config.js'
import mailingConnection from './mailing.js'

const mailLogger = consola.withScope(`MAIL`)

//----- MAILING CONNECTION

const mailingReady = new Promise((resolve, reject) => {
  mailingConnection
    .verify()
    .then(() => {
      mailLogger.ready(`transport creation – SUCCESS`)
      resolve()
    })
    .catch(error => {
      mailLogger.error(`transport creation – ERROR`)
      console.log(util.inspect(error, { colors: true }))
      console.log(`original config`)
      console.log(config.email)
      reject(`[MAILING] connection failed`)
    })
})

//----- CHECKS

export const servicesReady = Promise.all([mailingReady])

export const sendMail = mailingConnection.sendMail.bind(mailingConnection)
