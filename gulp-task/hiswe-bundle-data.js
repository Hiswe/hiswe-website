'use strict';

var gutil         = require('gulp-util');
var File          = gutil.File;
var PluginError   = gutil.PluginError;
var path          = require('path');
var marked        = require('marked');
var through       = require('through');
var openFile      = require('fs').openSync;
var extend        = require('extend');

var conf          = require('../gulp-config.js');
var renderer      = require('./marked-renderer.js');
var PLUGIN_NAME   = 'hiswe-bundle-data';

var homeBuffer      = null;
var xhrBuffer       = null;
var projectBuffer   = null;
var firstFile       = null;

function fileExist (absPath, ext) {
  // http://nodejs.org/api/fs.html#fs_fs_exists_path_callback
  try {
    openFile(absPath + '.' + ext, 'r');
    return true
  } catch (err) { return false; }
}

function formatCover (fileName, ext) {
  return {
    path: conf.img.serverSrc + fileName + '.' + ext,
    extension: ext
  }
};

function getCover (fileName) {
  fileName = 'cover-' + fileName;
  var absPath = firstFile.cwd +'/' + conf.img.dst + fileName;

  if (fileExist(absPath, 'png')) return formatCover(fileName, 'png');
  if (fileExist(absPath, 'svg')) return formatCover(fileName, 'svg');
  return new PluginError(PLUGIN_NAME,  'Not cover for ' + fileName);
}

function processHome (fileName, file) {
  marked.setOptions({
    renderer: renderer.home,
    smartypants: true
  });
  homeBuffer.push({
    order: ~~fileName[1],
    path: '/projects/' + fileName[2],
    cover: getCover(fileName[2]),
    id: 'project-' + fileName[2],
    name: fileName[2].replace(/-/gi, ' '),
    markup: marked(String(file.contents), {sanitize: true})
  });
}
function processXhr (fileName, file) {
  marked.setOptions({
    renderer: renderer.xhr,
    smartypants: true
  });
  xhrBuffer[fileName[2]] = marked(String(file.contents), {sanitize: true});
}

function processProject (fileName, file) {
  marked.setOptions({
    renderer: renderer.project,
    smartypants: true
  });
  projectBuffer[fileName[2]] = marked(String(file.contents), {sanitize: true});
}

// Plugin function
function bundle () {
  homeBuffer      = [];
  xhrBuffer       = {};
  projectBuffer   = {};

  function bufferContents(file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError(PLUGIN_NAME,  'Streaming not supported'));

    if (!firstFile) firstFile = file;

    var fileName = path.relative(file.base, file.path).match(/^(\d*)-(.*).md$/);

    processHome(fileName, file);
    processXhr(fileName, file);
    processProject(fileName, file);
  }

  function endStream() {
    var base = {
      cwd: firstFile.cwd,
      base: firstFile.base
    };

    // Home file
    homeBuffer.sort(function(a, b){ return  a.order < b.order});
    var homeJson = new File(extend({}, base, {
      path: path.join(firstFile.base, 'db-home.json'),
      contents: new Buffer(JSON.stringify(homeBuffer, null, 2))
    }));

    // Project file
    var projectJson = new File(extend({}, base, {
      path: path.join(firstFile.base, 'db-projects.json'),
      contents: new Buffer(JSON.stringify(projectBuffer, null, 2))
    }));

    // Xhr file
    var xhrJson = new File(extend({}, base, {
      path: path.join(firstFile.base, 'db-projects-xhr.json'),
      contents: new Buffer(JSON.stringify(xhrBuffer, null, 2))
    }));

    this.emit('data', homeJson);
    this.emit('data', projectJson);
    this.emit('data', xhrJson);
    this.emit('end');
  }

  return through(bufferContents, endStream);
};

// Export the plugin main function
module.exports = bundle;
