index = (req, res, next) ->
  res.render('front/home', {projects: require('../../config/datas/db-work.json')})

exports.index = index
exports.name  = ''
