nconf = require 'nconf'

index = (req, res, next) ->
  res.render('front/layout')

exports.index = index
exports.name  = ''
