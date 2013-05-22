class Boot extends hw.Controller
  trace: true
  logPrefix: '[BOOT]'

  constructor: ->
    @log 'init'
    @Home = new hw.Home()

hw.Boot = Boot
