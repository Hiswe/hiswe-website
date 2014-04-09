var Q             = require('q');
var fs            = require('fs');
var path          = require('./gulp-path.js');
var gutil         = require('gulp-util');
var marked        = require('marked');

var jsonDb        = [];
var openFile      = Q.denodeify(fs.open);

// Markdown config
var renderer      = new marked.Renderer();
renderer.heading  = function (text, level) {
  var escapedText = text.replace(/-/gi, ' ');
  return '<h' + level + '>' + escapedText + '</h' + level + '>';
};

marked.setOptions({
  renderer: renderer,
  smartypants: true
});


// Other things
var setCover = function setCover(fileName) {
  var deferred  = Q.defer();
  fileName = 'cover-' + fileName[2];
  var relativePath  = path.imgDst + fileName
  var absolutePath  = __dirname + '/' + path.imgDst + fileName
  openFile(absolutePath + '.png', 'r')
    .then(function () {
      return relativePath + '.png';
    }, function (err){
      return openFile(absolutePath + '.svg', 'r')
    })
    .then(function (file){
      if(typeof file === 'number') {
        return deferred.resolve(relativePath + '.svg');
      }
      return deferred.resolve(file);
    }, function (err){
      return deferred.reject('no such files' + relativePath + '.png|svg');
    }).done();

  return deferred.promise;
};

var parseFile = function readFile(fileName, data, deferred) {
  fileName = fileName.match(/^(\d*)-(.*).md$/)

  setCover(fileName)
    .then(function (coverImage) {
      jsonDb.push({
        order: ~~fileName[1],
        id: 'project-' + fileName[2],
        name: fileName[2].replace(/-/gi, ' '),
        cover: coverImage,
        markup: marked(data, {sanitize: true})
      });
      return deferred.resolve();
    }, function (err){
      deferred.reject(err);
    });
};

var walkFiles = function walkFiles(files) {
  var mdFiles = files.filter(function(fileName){
    return /.md$/.test(fileName);
  });
  return mdFiles.map(function (fileName) {
    var deferred  = Q.defer();
    Q.npost(fs, 'readFile', [path.datas + '/' + fileName, {encoding: 'utf8'}])
      .then(function(data){ parseFile(fileName, data, deferred)});
    return deferred.promise
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
      return deferred.resolve();
    }, function(err){
      return deferred.reject(new gutil.PluginError('json', err));
    });

  return deferred.promise
};

module.exports = bundleData
