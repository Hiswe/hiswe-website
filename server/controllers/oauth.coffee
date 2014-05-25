googleapis    = require 'googleapis'

conf          = require('rc')('HISWE')
log           = '[OAUTH]'

exports.generateAuthUrl = (req) ->
  redirectUrl = req.protocol + '://' + req.get('host') + '/oauth2callback'
  # Google Auth
  OAuth2        = googleapis.auth.OAuth2
  console.log log.debg 'generate Auth Url'
  console.log conf.AUTH_ID, conf.AUTH_SECRET
  oauth2Client  = new OAuth2(conf.AUTH_ID, conf.AUTH_SECRET, redirectUrl);

  # generates a url that allows offline access and asks permissions
  url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://mail.google.com'
  })

  console.log log.debug, 'generate auth url'
  console.log url

exports.index = (req, res, next) ->
  console.log log.debug, 'authorization code'
  console.log req.query.code

  oauth2Client.getToken req.query.code, (err, tokens) ->
    if err
      console.log log.error, err
    else
      console.log log.debug 'access tokens'
      console.log tokens
    res.redirect('/')



