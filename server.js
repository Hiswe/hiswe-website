'use strict';
require('coffee-script');

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

var conf    = require('rc')('HISWE', {
  VERSION: pack.version,
  PATH: __dirname
});

//  Load boot file and fire away!
var app     = require('./config/app')();
var port    = conf.PORT;

var server  = http.createServer(app)

if (!port) {
  throw 'no port defined for the application'
}

server.listen(port);

console.log(log.info, 'Express server listening on port', port);
