import util from 'util'
import chalk from 'chalk'

import config from '../config'
import mailingConnection from './mailing'

//----- MAILING CONNECTION

const mailingReady = new Promise((resolve, reject) => {
  mailingConnection
    .verify()
    .then(() => {
      console.log(chalk.green(`[MAILING]`), `transport creation – SUCCESS`)
      resolve()
    })
    .catch(error => {
      console.log(chalk.red(`[MAILING]`, `transport creation – ERROR`))
      console.log(util.inspect(error, { colors: true }))
      console.log(`original config`)
      console.log(config.email)
      reject(`[MAILING] connection failed`)
    })
})

//----- CHECKS

export const servicesReady = Promise.all([mailingReady])

export const sendMail = mailingConnection.sendMail.bind(mailingConnection)
