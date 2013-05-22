nconf     = require 'nconf'
alphamail = require 'alphamail'

adminMail     = nconf.get('ADMIN_MAIL')
mailApiKey    = nconf.get('MAIL_API_KEY')
mailProjectId = ~~nconf.get('MAIL_PROJECT_ID') # Cast into number
emailService  = new alphamail.EmailService(mailApiKey)
log           = '[CONTACT]'

index = (req, res, next) ->
  console.log log.debug, 'GET'
  res.render 'front/contact', {
    errors: req.flash('errors')
    success: req.flash('success')
  }

create = (req, res, next) ->
  console.log req.body
  form = req.body
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
      req.flash 'errors', 'Message not send'
    else
      console.log log.debug, 'Mail has been send'
      req.flash 'success', 'Message send'

    res.redirect('/contact')

createXhr = (req, res, next) ->
  form = req.body
  console.log log.debug, 'POST XHR'
  unless isValid(form)
    console.log log.debug, form
    console.log log.warn, 'validation fail' , req.body
    return res.send 400, 'validation fail'
  sendMail form, (err, result) ->
    if err
      console.log log.error, 'Mail has not been send'
      console.log err
      return res.send(500, 'Message not send')
    console.log log.debug, 'Mail has been send'
    res.json {ok:true}

sendMail = (data, callback) ->
  alog = "#{log}[SEND MAIL]"
  console.log alog.debug, data

  payload = new alphamail.EmailMessagePayload()
    .setProjectId(mailProjectId) # ID of "Banjai Garden" project
    .setSender(new alphamail.EmailContact( data.email, data.email))
    .setReceiver(new alphamail.EmailContact( adminMail, adminMail))
    .setBodyObject(data)

  emailService.queue payload, callback

isValid = (form) ->
  return false
  alog = "#{log}[VALIDATE]"
  unless form.name? and form.email? and form.message?
    console.log log.warn, 'one of the fields is missing', form
    return false
  # http://blog.gerv.net/2011/05/html5_email_address_regexp/
  emailTest = /// ^
    [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+
    @[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:
    [a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$
  ///
  unless emailTest.test(form.email)
    console.log log.warn, 'email not valid', form.email
    return false
  true

exports.index   = index
exports.create  = create
