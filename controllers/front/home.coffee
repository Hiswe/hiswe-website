index = (req, res, next) ->
  res.render('front/home', {projects: require('../../config/datas/db-home.json')})

exports.index = index
