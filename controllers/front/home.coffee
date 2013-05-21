nconf = require 'nconf'

index = (req, res, next) ->
  res.render('front/home')

exports.index = index
exports.name  = ''
