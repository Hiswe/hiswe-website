nconf = require 'nconf'

index = (req, res, next) ->
  res.render('front/layout')

create = (req, res, next) ->
  res.redirect('/')

exports.index   = index
exports.create  = create
