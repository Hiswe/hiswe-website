index = (req, res, next) ->
  res.render('home', {projects: require('../datas/db-home.json')})

exports.index = index
