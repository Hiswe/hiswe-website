googleapis    = require 'googleapis'

conf          = require('rc')('HISWE')
log           = '[OAUTH]'



exports.generateAuthUrl = (req) ->
  redirectUrl = req.protocol + '://' + req.get('host') + '/oauthcallback'
  # Google Auth
  OAuth2        = googleapis.auth.OAuth2
  oauth2Client  = new OAuth2(conf.AUTH_ID, conf.AUTH_SECRET, redirectUrl);

  # generates a url that allows offline access and asks permissions
  url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://mail.google.com'
  })

  console.log log.debug, 'generate auth url'
  console.log url

exports.index = (req, res, next) ->
  console.log log.debug, 'access token'
  console.log req.query.code
  res.redirect('/')