import nodemailer from 'nodemailer'

import config from '../config'

const { transport, provider } = config.email
const usedTransport = provider ? provider : transport
const transporter = nodemailer.createTransport(usedTransport)

export default transporter
