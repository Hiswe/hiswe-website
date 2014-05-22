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

var conf    = require('rc')('hiswe', {
  VERSION: pack.version,
  PATH: __dirname
});

// check conf
['MAIL_ADMIN', 'MAIL_API_KEY', 'MAIL_PROJECT_ID',
  'AWS_ACCESS_KEY_ID', 'AWS_SECRET_KEY', 'AWS_BUCKET'].forEach(function(key){
    if (conf[key] == null) {
      var message = 'necessary config for ' + key + ' is not defined'
      console.log(conf);
      throw new Error(message);
    }
});

// Load boot file and fire away!
var app     = require('./server/app.coffee')();
// process.env.PORT is for Heroku
var port    = conf.PORT || process.env.PORT || 5000;

var server  = http.createServer(app)

if (!port) {
  throw 'no port defined for the application'
}

server.listen(port);

console.log(log.info, 'Express server listening on port', port);
