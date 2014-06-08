'use strict';

var gutil         = require('gulp-util');
var File          = gutil.File;
var PluginError   = gutil.PluginError;
var path          = require('path');
var through       = require('through');
var openFile      = require('fs').openSync;
var extend        = require('extend');
var parser        = require('css-parse');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder       = new StringDecoder('utf8');

var PLUGIN_NAME   = 'hiswe-icons';

// This plugin generate an object containing icons name with their size
// This will be use by the jade mixin to have the proper viewbox
function bundle () {
  var buffer          = {};
  var firstFile       = null;

  function bufferContents(file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError(PLUGIN_NAME,  'Streaming not supported'));

    if (!firstFile) firstFile = file;

    var result = parser(decoder.write(file.contents));
    result.stylesheet.rules.forEach(function(rule) {
      var name = /^\.svgicon-(.*)$/.exec(rule.selectors[0])[1];
      var width   = ~~rule.declarations[0].value.replace('px', '')
      var height  = ~~rule.declarations[1].value.replace('px', '')
      buffer[name] = {
        width: width,
        height: height
      };
    });
  }

  function endStream() {
    var base = {
      cwd: firstFile.cwd,
      base: firstFile.base
    };
    var json = new File(extend({}, base, {
      path: path.join(firstFile.base, 'hiswe-icons.json'),
      contents: new Buffer(JSON.stringify(buffer, null, 2))
    }));

    this.emit('data', firstFile);
    this.emit('data', json);
    this.emit('end');
  }

  return through(bufferContents, endStream);
};

// Export the plugin main function
module.exports = bundle;
