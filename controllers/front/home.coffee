index = (req, res, next) ->
  res.render('front/home', {works: require('../../config/datas/db-work.json')})

exports.index = index
exports.name  = ''
