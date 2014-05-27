'use strict';
require('coffee-script/register');

var colors  = require('colors');
var fs      = require('fs');
var http    = require('http');

var pack    = require('./package.json');
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

// check conf
var conf    = require('./server/settings');

['AUTH_USER',
  'AUTH_ID',
  'AUTH_SECRET',
  'MAIL_TO',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_KEY',
  'AWS_BUCKET'
].forEach(function(key){
    if (conf[key] == null) {
      var message = 'necessary config for ' + key + ' is not defined'
      console.log(conf);
      throw new Error(message);
    }
});

if (conf.AUTH_REFRESH_TOKEN == null) {
  console.warn('necessary config for AUTH_TOKEN is not defined');
  console.log(conf);
}

// Load boot file and fire away!
var app     = require('./server/app.coffee')();
var port    = conf.PORT;
var server  = http.createServer(app)

if (!port) {
  throw 'no port defined for the application'
}

server.listen(port);

console.log(log.info, 'Express server', pack.version, 'listening on port', port);
