class App extends hw.Controller
  trace: true
  logPrefix: '[APP]'

  constructor: ->
    @log 'init'
    @Home = new hw.Home()

hw.App = App
