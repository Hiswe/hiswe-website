_             = require 'lodash'
fs            = require 'fs'
path          = require 'path'
nodemailer    = require 'nodemailer'
jade          = require 'jade'

conf          = require './../settings'
log           = '[CONTACT]'

# Mail service
smtpTransport = nodemailer.createTransport 'SMTP', {
  service: 'Gmail',
  auth: {
    XOAuth2: {
      user:         conf.AUTH_USER
      clientId:     conf.AUTH_ID
      clientSecret: conf.AUTH_SECRET
      refreshToken: conf.AUTH_REFRESH_TOKEN
    }
  }
}

mailOptions = {
  to: conf.MAIL_TO # list of receivers
}

index = (req, res, next) ->
  # console.log log.debug, 'GET'
  res.render 'contact', {
    errors: req.flash('errors')
    success: req.flash('success')
  }

create = (req, res, next) ->
  console.log req.body
  return createXhr(req, res, next) if req.xhr
  console.log log.debug, 'POST'
  form = req.body
  unless isValid(form)
    req.flash 'errors', 'Validation fail'
    return res.redirect('/contact')

  sendMail form, (err, result) ->
    if err
      console.log log.error, 'Mail has not been send'
      console.log err
      req.flash 'errors', 'Message not send. Please try yannick.aivayan@hiswe.net'
    else
      console.log log.debug, 'Mail has been send'
      req.flash 'success', 'Message send'

    # if you don't want to use this transport object anymore, uncomment following line
    # smtpTransport.close(); # shut down the connection pool, no more messages

    res.redirect('/contact')

createXhr = (req, res, next) ->
  console.log log.debug, 'POST XHR'
  form = req.body
  validation = isValid(form)
  unless validation.status
    console.log log.debug, form
    console.log log.warn, 'validation fail' , req.body
    return res.send 400, "validation fail <br>#{validation.message}"

  sendMail form, (err, result) ->
    if err
      # Generate an auth url in case of error coming from bad oauth configuration
      require('./oauth').generateAuthUrl(req)
      console.log log.error, 'XHR Mail has not been send'
      console.log err
      return res.send(500, 'Message not send. Please try yannick.aivayan@hiswe.net')
    console.log log.debug, 'Mail has been send'
    res.json {ok:true, message: 'Mail has been send'}

sendMail = (data, callback) ->
  alog = "#{log}[SEND MAIL]"
  console.log alog.debug, data

  templatePath = path.join(__dirname, '../../views/mailing.jade')
  message = jade.render(fs.readFileSync(templatePath, 'utf8'), data)

  mail = {
    from: "#{data.name} <#{data.email}>", # sender address
    subject: "[HISWE] contact demand from #{data.name}", # Subject line
    html: message # html body
  }

  options = _.extend {}, mail, mailOptions

  smtpTransport.sendMail options, callback


isValid = (form) ->
  alog = "#{log}[VALIDATE]"
  unless form.name? and form.email? and form.message?
    console.log log.warn, 'one of the fields is missing', form
    return {status: true, message: 'A field is missing'}
  # http://blog.gerv.net/2011/05/html5_email_address_regexp/
  emailTest = /// ^
    [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+
    @[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:
    [a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$
  ///
  unless emailTest.test(form.email)
    console.log log.warn, 'email not valid', form.email
    return {status: true, message: 'The email adress is not valid'}
  {status: true}

exports.index   = index
exports.create  = create
