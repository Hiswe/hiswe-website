'use strict';

var Q             = require('q');
var fs            = require('fs');
var conf          = require('./gulp-config.js');
var gutil         = require('gulp-util');
var renderer      = require('./marked-renderer.js');
var marked        = require('marked');
var homeDb        = [];
var projectsDb    = {};
var projectsXhrDb = {};
var openFile      = Q.denodeify(fs.open);
var readFile      = Q.denodeify(fs.readFile);


// Other things
var imageDescription = function imageDescription(fileName, extension) {
  return {
    path: '/' + conf.serverSrc + fileName + '.' + extension,
    extension: extension
  };
};

var setCover = function setCover(fileName) {
  var deferred  = Q.defer();
  fileName = 'cover-' + fileName[2];
  var absolutePath  = __dirname + '/' + conf.img.dst + fileName
  openFile(absolutePath + '.png', 'r')
    .then(function () {
      return imageDescription(fileName, 'png');
    })
    .catch(function (err){
      return openFile(absolutePath + '.svg', 'r')
    })
    .then(function (file){
      if(typeof file === 'number') {
        return deferred.resolve(imageDescription(fileName, 'svg'));
      }
      return deferred.resolve(file);
    })
    .catch(function (err){
      return deferred.reject('no such files' + conf.serverSrc + fileName + '.png | svg');
    })
    .done();

  return deferred.promise;
};

var saveforHome = function saveforHome(fileName, data, coverImage) {
  marked.setOptions({
    renderer: renderer.titleRenderer,
    smartypants: true
  });

  homeDb.push({
    order: ~~fileName[1],
    path: '/projects/' + fileName[2],
    id: 'project-' + fileName[2],
    name: fileName[2].replace(/-/gi, ' '),
    cover: coverImage,
    markup: marked(data, {sanitize: true})
  });
};

var saveForProject = function saveForProject(fileName, data, coverImage) {
  marked.setOptions({
    renderer: renderer.projectsRenderer,
    smartypants: true
  });

  projectsDb[fileName[2]] = marked(data, {sanitize: true});


  // For xhr projects
  marked.setOptions({
    renderer: renderer.bodyRenderer,
    smartypants: true
  });
  var bodyContent = marked(data, {sanitize: true});
  // Wrap in a div for DOM performance reason
  bodyContent = '<div class="hw-projects-content-body">' + bodyContent + '</div>'
  projectsXhrDb[fileName[2]] = bodyContent;

};

var processMarkdownFile = function processMarkdownFile(fileName, data, deferred) {

  fileName = fileName.match(/^(\d*)-(.*).md$/);

  setCover(fileName)
    .then(function (coverImage) {
      saveforHome(fileName, data, coverImage);
      saveForProject(fileName, data, coverImage);
      return deferred.resolve();
    })
    .catch(function (err){
      return deferred.reject(err);
    })
    .done();
};

var walkFiles = function walkFiles(files) {
  var mdFiles = files.filter(function(fileName){
    return /.md$/.test(fileName);
  });
  return mdFiles.map(function (fileName) {
    var deferred  = Q.defer();
    readFile(conf.db.src + '/' + fileName, {encoding: 'utf8'})
      .then(function (data) {
        return processMarkdownFile(fileName, data, deferred)
      });
    return deferred.promise;
  });
};

var bundleData = function bundleData(){
  var deferred  = Q.defer();
  homeDb    = [];

  Q.ninvoke(fs, 'readdir', conf.db.src)
    .then(walkFiles)
    .all()
    .done(function(){
      homeDb.sort(function(a, b){ return  a.order < b.order});
      fs.writeFileSync(conf.db.homeDst, JSON.stringify(homeDb, null, 2));
      fs.writeFileSync(conf.db.projectsXhrDst, JSON.stringify(projectsXhrDb, null, 2));
      fs.writeFileSync(conf.db.projectsDst, JSON.stringify(projectsDb, null, 2));
      return deferred.resolve();
    }, function(err){
      return deferred.reject(new gutil.PluginError('json', err));
    });

  return deferred.promise
};

module.exports = bundleData
