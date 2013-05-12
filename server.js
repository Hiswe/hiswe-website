'use strict';
require('coffee-script');

var colors  = require('colors');
var fs      = require('fs');
var nconf   = require('nconf');
var http    = require('http');

var pack    = require('./package.json');
var comp    = require('./component.json');
var log     = '[APP]';

colors.setTheme({
  silly:  'rainbow',
  input:  'grey',
  prompt: 'grey',
  info:   'green',
  data:   'grey',
  help:   'cyan',
  warn:   'yellow',
  debug:  'blue',
  error:  'red',
  err:    'red'
});

// automatically update component name and version
(function () {
  // component
  comp.name     = pack.name
  comp.version  = pack.version
  comp          = JSON.stringify(comp, null, 2);
  fs.writeFileSync('./component.json', comp);
  // nconf
  nconf.merge('app:version', pack.version)
})();

// Load nconf
var config  = require('./config/settings');

//  Load boot file and fire away!
var app     = require('./config/app')();
var port    = nconf.get('PORT') || nconf.get('app:port');

var server  = http.createServer(app)

if (!port) {
  throw 'no port defined for the application'
}

server.listen(port);

console.log(log.info, 'Express server listening on port', port);
