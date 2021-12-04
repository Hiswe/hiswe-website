import dotenv from 'dotenv'
import sendGrid from '@sendgrid/mail'

dotenv.config();

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

export const sendMail = (msg) => sendGrid.send(msg)
