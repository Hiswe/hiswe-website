'use strict';

var marked                = require('marked');
var r                     = new marked.Renderer();
var fs                    = require('fs');
var sizeOf                = require('image-size');
var parseString           = require('xml2js').parseString;
var pathToTransparentGif  = __dirname + '/public/media/blank.gif';

// Create a base64 transparent gif
// This prevent image src to be empty…
var blankGif = new Buffer(fs.readFileSync(pathToTransparentGif)).toString('base64');
blankGif = 'data:image/gif;base64,' + blankGif;

// All the join are made with '' instead of '\n'
// We don't need to preserve source formating

r.heading = function (text, level) {
  var escapedText = text.replace(/-/gi, ' ');
  if (level === 4) {
    return [
      '<h' + level + ' class="hw-projects-center">' + escapedText + '</h' + level + '>'
    ].join('')
  }
  return [
    '<h' + level + '>' + escapedText + '</h' + level + '>',
  ].join('')
};

r.list = function (body, ordered) {
  if (ordered) {
    return [
      '<ol>' + body + '</ol>'
    ].join('');
  }
  return [
    '<div class="hw-projects-gallery-container">',
      '<div class="hw-projects-gallery">',
        '<ul>' + body  + '</ul>',
      '</div>',
    '</div>'
  ].join('');
};

r.blockquote = function (quote) {
  return [
    '<aside class="hw-projects-aside-container">',
      '<div class="hw-projects-aside">' + quote + '</div>',
    '</aside>'
  ].join('');
};

r.paragraph = function (text) {
  return [
    '<p class="hw-projects-center">' + text + '</p>'
  ].join('');
};

// All operations are done sync
// I don't think that marked support async rendering functions
r.image = function (href, title, text) {

  var type                = '';
  var noScriptImageMarkup = ['<img', ' src="', href, '"', ' />'];
  var index               = noScriptImageMarkup.length - 1;
  var lazyLoadImageMarkup = [];
  var realImagePath       = 'public/' + href;

  if (typeof title !== "undefined" && title !== null && title !== null) {
    noScriptImageMarkup.splice(index, 0, ' alt="' + title + '"');
  }

  if (/\.svg$/.test(href)) {
    type = 'hw-projects-image-vector';

    parseString(
      fs.readFileSync(realImagePath),
      {aync: false},
      function (err, result) {
        if (err) { return console.log(err);}
        dimensions = result.svg.$;
        noScriptImageMarkup.splice(index, 0, ' height="' + dimensions.height + '"');
        noScriptImageMarkup.splice(index, 0, ' width="' + dimensions.width + '"');
    });
  } else {
    type = 'hw-projects-image-pixel';

    var dimensions = sizeOf(realImagePath);
    noScriptImageMarkup.splice(index, 0, ' height="' + dimensions.height + '"');
    noScriptImageMarkup.splice(index, 0, ' width="' + dimensions.width + '"');
  }

  lazyLoadImageMarkup = noScriptImageMarkup.slice();
  lazyLoadImageMarkup.splice(index, 0, ' data-original="', href, '"', ' class="hw-projects-lazyload"');
  lazyLoadImageMarkup[2] = blankGif;

  var rendereMarkup =  [
    '<figure class="' + type + '">',
      lazyLoadImageMarkup.join(''),
      '<noscript>',
        noScriptImageMarkup.join(''),
      '</noscript>',
    '</figure>'
  ];
  if (typeof text !== "undefined" && text !== null && text !== '') {
    rendereMarkup.splice(rendereMarkup.length - 1, 0,'<figcaption>' + text + '</figcaption>');
  }

  return rendereMarkup.join('')
};

module.exports = r;
