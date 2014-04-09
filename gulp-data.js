var Q           = require('q');
var fs          = require('fs');
var marked      = require('marked');
var path        = require('./gulp-path.js');

var jsonDb      = [];

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  var escapedText = text.replace(/-/gi, ' ');
  return '<h' + level + '>' + escapedText + '</h' + level + '>';
};

marked.setOptions({
  renderer: renderer,
  smartypants: true
});

var parseFile = function readFile(fileName, data) {
  fileName = fileName.match(/^(\d*)-(.*).md$/)
  jsonDb.push({
    order: ~~fileName[1],
    id: 'project-' + fileName[2],
    name: fileName[2].replace(/-/gi, ' '),
    markup: marked(data, {sanitize: true})
  });
};

var walkFiles = function walkFiles(files) {
  return files.filter(function(fileName){
    return /.md$/.test(fileName);
  }).map(function (fileName) {
    return Q.npost(fs, 'readFile', [path.datas + '/' + fileName, {encoding: 'utf8'}])
      .then(function(data){ parseFile(fileName, data)});
  });
};

var bundleData = function bundleData(){
  var deferred  = Q.defer();
  jsonDb    = [];

  Q.ninvoke(fs, 'readdir', path.datas)
    .then(walkFiles)
    .all()
    .done(function(){
      jsonDb.sort(function(a, b){ return  a.order < b.order});
      fs.writeFileSync(path.jsonDb, JSON.stringify(jsonDb, null, 2));
      deferred.resolve();
    });

  return deferred.promise
};

module.exports = bundleData
