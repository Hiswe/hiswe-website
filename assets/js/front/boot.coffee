App = require('./app.coffee')

jQuery ->
  window.app = new App({el: $('html')})
