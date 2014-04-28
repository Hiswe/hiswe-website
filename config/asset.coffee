express   = require 'express'
path      = require 'path'
conf      = require('rc')('HISWE')
log       = '[ASSETS]'
awsLog    = log + '[AWS]'

aws       = require('knox').createClient({
  key:    conf.AWS_ACCESS_KEY_ID
  secret: conf.AWS_SECRET_KEY
  bucket: conf.AWS_BUCKET
  region: 'eu-west-1'
  secure: off
})

# Other examples on http://stackoverflow.com/questions/17516820/serving-files-stored-in-s3-in-express-nodejs-app
streamAws = (req, res, next)  ->
  aws.getFile "/#{req.params.id}", (err, resp) ->
    if err
      console.log awsLog.error, req.params.id, err
      return next(err)

    res.setHeader('Content-Length', resp.headers['content-length'])
    res.setHeader('Content-Type', resp.headers['content-type'])
    # console.log awsLog.prompt, req.params.id
    return resp.pipe(res)

slowAssets = (req, res, next) ->
  if /\.(jpg||jpeg||png||svg)$/i.test req.url
    # setTimeout(next, 250 + Math.round(1000 * Math.random()))
    setTimeout(next, 2000 + Math.round(2000 * Math.random()))
  else
    next()

module.exports = (app) ->
  console.log log.debug, 'setup assets'

  maxAge = 0

  # Slow assets on dev
  if app.get('env') is 'development'
    console.log awsLog.warn, 'use local images'
    app.use(slowAssets)

  if app.get('env') is 'production'
    console.log awsLog.prompt, 'use AWS CDN'
    # Amazon S3 support
    app.get '/media/images/:id', streamAws
    # Statics
    maxAge = 2629800000 # 1 month

  # Statics
  assets    = path.join(__dirname, '/../public')
  app.use express.static(assets, {maxAge: maxAge})

  return app
