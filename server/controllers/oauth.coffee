googleapis    = require 'googleapis'

conf          = require './../settings'
log           = '[OAUTH]'

ouath2        = {}

exports.generateAuthUrl = (req) ->
  redirectUrl = req.protocol + '://' + req.get('host') + '/oauth2callback'
  # Google Auth
  OAuth2        = googleapis.auth.OAuth2
  console.log log.debug, 'generate Auth Url'
  console.log conf.AUTH_ID, conf.AUTH_SECRET
  ouath2.client  = new OAuth2(conf.AUTH_ID, conf.AUTH_SECRET, redirectUrl)

  # generates a url that allows offline access and asks permissions
  url = ouath2.client.generateAuthUrl({
    access_type: 'offline'
    scope: 'https://mail.google.com'
    approval_prompt: 'force'
  })

  console.log log.help, 'generate auth url'
  console.log url

exports.index = (req, res, next) ->
  console.log log.help, 'authorization code'
  console.log req.query.code

  ouath2.client.getToken req.query.code, (err, tokens) ->
    if err
      console.log log.error, err
    else
      console.log log.help, 'access tokens'
      console.log tokens
    res.redirect('/')
