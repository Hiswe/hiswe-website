'use strict';

var marked                = require('marked');
var homeRenderer          = new marked.Renderer();
var projectsRenderer      = new marked.Renderer();
var fs                    = require('fs');
var sizeOf                = require('image-size');
var parseString           = require('xml2js').parseString;


// Create a base64 transparent gif
// This prevent image src to be empty…
var pathToTransparentGif  = __dirname + '/public/media/blank.gif';
var blankGif = new Buffer(fs.readFileSync(pathToTransparentGif)).toString('base64');
blankGif = 'data:image/gif;base64,' + blankGif;

// All the join are made with '' instead of '\n'
// We don't need to preserve source formating
var heading = function heading (text, level) {
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

var list = function list(body, ordered) {
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

var blockquote = function blockquote(quote) {
  return [
    '<aside class="hw-projects-aside-container">',
      '<div class="hw-projects-aside">' + quote + '</div>',
    '</aside>'
  ].join('');
};

var paragraph = function paragraph(text) {
  return [
    '<p class="hw-projects-center">' + text + '</p>'
  ].join('');
};

var getImageInfo = function getImageInfo(href) {
  var type                = '';
  var realImagePath       = 'public/' + href;
  var dimensions          = {};

  if (/\.svg$/.test(href)) {
    type = 'hw-projects-image-vector';
    parseString(
      fs.readFileSync(realImagePath),
      {aync: false},
      function (err, result) {
        if (err) { return console.log(err);}
        dimensions = result.svg.$;
    });
  } else {
    type = 'hw-projects-image-pixel';
    dimensions = sizeOf(realImagePath);
  }

  return {
    type: type,
    width: dimensions.width,
    height: dimensions.height
  };

};

var buildImage = function buildImage(href, title) {
  // fix leading slash
  href = /^\//.test(href) ? href : "/" + href;
  // make preview href
  var previewHref = href.replace(/(.*)\.(jpg|png|svg|jpeg)$/, '$1-preview.$2');

  var imageInformations = getImageInfo(previewHref);
  var imageMarkup = [
    '<img',
    ' src="',
    previewHref,
    '"',
    ' height="' + imageInformations.height + '"',
    ' width="' + imageInformations.width + '"',
    ' />'];
  var index = imageMarkup.length - 1;

  if (typeof title !== "undefined" && title !== null && title !== null) {
    imageMarkup.splice(index, 0, ' alt="' + title + '"');
  } else {
    // need this for the link in figure
    title = href;
  }

  return {
    title: title,
    markup: imageMarkup,
    href: href,
    type: imageInformations.type
  };
};

var buildFigure = function (image, text) {
  var figureMarkup =  [
    '<figure class="' + image.type + '">',
      image.markup.join(''),
      '<a href="' + image.href + '">' + image.title + '</a>',
    '</figure>'
  ];

  if (typeof text !== "undefined" && text !== null && text !== '') {
    figureMarkup.splice(figureMarkup.length - 1, 0,'<figcaption>' + text + '</figcaption>');
  }

  return figureMarkup.join('')
}

// All operations are done sync
// I don't think that marked support async rendering functions
var homeImage = function homeImage(href, title, text) {
  var image       = buildImage(href, title);
  var nodeData = ' data-original="' + href + '"' + ' class="hw-projects-lazyload"';

  image.markup.splice(image.markup.length - 1, 0, nodeData);
  image.markup[2] = blankGif;

  return buildFigure(image, text);
};

var projectsImage = function projectsImage(href, title, text) {
  var image       = buildImage(href, title);
  return buildFigure(image, text);
};

homeRenderer.heading        = heading;
homeRenderer.list           = list;
homeRenderer.blockquote     = blockquote;
homeRenderer.paragraph      = paragraph;
homeRenderer.image          = homeImage;

projectsRenderer.heading    = heading;
projectsRenderer.list       = list;
projectsRenderer.blockquote = blockquote;
projectsRenderer.paragraph  = paragraph;
projectsRenderer.image      = projectsImage;

exports.homeRenderer        = homeRenderer;
exports.projectsRenderer    = projectsRenderer;
