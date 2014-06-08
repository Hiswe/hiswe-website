'use strict';

var _             = require('lodash');
var gutil         = require('gulp-util');
var File          = gutil.File;
var path          = require('path');
var SVGO          = require('svgo');
var svgo          = new SVGO();
var jade          = require('jade');
var through       = require('through2');
var _tmpl         = require('consolidate').lodash

var PLUGIN_NAME   = "hiswe-svg-symbol";
var svgTplFile    = __dirname + '/hiswe-svg-symbols-template.jade'
var cssTplFile    = __dirname + '/hiswe-svg-symbols-template.css'
var buffer        = [];
var defaults      = {
    svgId:     '%f',
    className: '.%f'
};
var options       = {};

function transform(file, encoding, cb) {
  if (file.isNull()) {
    this.push(file);
    return cb();
  }
  if (file.isStream()) {
    this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    return cb();
  }

  var that = this;
  svgo.optimize(file.contents.toString(), function (result) {
    result.data           = result.data.replace(/^<svg[^>]+>|<\/svg>$/g, "");
    result.info.width     = ~~result.info.width;
    result.info.height    = ~~result.info.height;
    result.info.name      = /(.*)\.svg/.exec(path.basename(file.path))[1];
    result.info.id        = options.svgId.replace("%f", result.info.name);
    result.info.className = options.className.replace("%f", result.info.name);
    buffer.push(result)
    return cb(null);
  });
}

function flush(cb) {
  var that = this;
  var svgContent = jade.renderFile(svgTplFile, {icons: buffer, pretty: true});
  this.push(new File({
      cwd:  './',
      base: './',
      path: 'svg-symbols.svg',
      contents: new Buffer(svgContent)
  }))
  _tmpl(cssTplFile, {icons: buffer}, function (err, result){
    that.push(new File({
      cwd:  './',
      base: './',
      path: 'svg-symbols.css',
      contents: new Buffer(result)
    }))
    cb();
  });
}

// Greatly inspired by https://www.npmjs.org/package/gulp-svg-sprites
module.exports = function (opts) {
  options = _.merge(_.cloneDeep(defaults), opts || {});
  return through.obj(transform, flush);
};
