nconf = require 'nconf'

home = (req, res, next) ->
  res.render('front/layout')

module.exports = home
