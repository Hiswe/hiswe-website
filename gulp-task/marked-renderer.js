'use strict';

var marked                = require('marked');
var jade                  = require('jade');
var titleRenderer         = new marked.Renderer();
var bodyRenderer          = new marked.Renderer();
var projectsRenderer      = new marked.Renderer();
var fs                    = require('fs');
var sizeOf                = require('image-size');
var parseString           = require('xml2js').parseString;

var render = function render(template, data) {
  var templatePath = __dirname + '/' + template + '.jade';
  return jade.renderFile(templatePath, data);
};

// Create a base64 transparent gif
// This prevent image src to be empty…
var pathToTransparentGif  = __dirname + '/../public/media/blank.gif';
var blankGif = new Buffer(fs.readFileSync(pathToTransparentGif)).toString('base64');
blankGif = 'data:image/gif;base64,' + blankGif;

var noop = function noop () {
  return ''
}

function bareTitle (text, level) {
  var escapedText = text.replace(/-/gi, ' ');
  return '<h' + level + '>' + escapedText + '</h' + level + '>'
};

function centeredTitle (text, level) {
  var escapedText = text.replace(/-/gi, ' ');
  return '<h' + level + ' class="hw-projects-center">' + escapedText + '</h' + level + '>'
};

// Titles
function heading (text, level) {
  if (level === 4) return centeredTitle(text, level);
  return bareTitle(text, level)
};

function titleHeading (text, level) {
  if (level > 2) { return ''; }
  return bareTitle(text, level)
};

function bodyHeading (text, level) {
  if (level < 3) { return ''; }
  if (level === 4) return centeredTitle(text, level);
  return bareTitle(text, level)
};

function list(body, ordered) {
  if (ordered) return '<ol>' + body + '</ol>';
  return render('gallery', {body: body});
};

function blockquote(quote) {
  return render('aside', {quote: quote});
};

function paragraph(text) {
  return jade.render('p.hw-projects-center!= text', {text: text});
};

// Format image data && add size
function getImageInfo(href, title, text) {
  href = /^\//.test(href) ? href : "/" + href;   // fix leading slash
  var type                = '';
  var previewHref         = href
  var dimensions          = {};

  try {
    if (/\.svg$/.test(href)) {
      type = 'hw-projects-image-vector';
      parseString(
        fs.readFileSync('public' + previewHref),
        {aync: false},
        function (err, result) {
          if (err) { return console.log(err);}
          dimensions = result.svg.$;
      });
    } else {
      previewHref = href.replace(/(.*)\.(jpg|png|jpeg)$/, '$1-preview.$2')
      type = 'hw-projects-image-pixel';
      dimensions = sizeOf('public' + previewHref);
    }
  } catch (e) {
    // Take care of exceptions
    // -> bad image path as an example
    console.log('No such image :', previewHref)
    dimensions = {width: '', height: ''};
    type = '';
  }


  return {
    href: previewHref,
    link: href,
    text: text,
    title: title,
    type: type,
    width: dimensions.width,
    height: dimensions.height
  };
};

function buildFigure(imageInformations) {
  var body = render('image', {image: imageInformations});
  return render('figure', {image: imageInformations, body: body})
}

var homeImage = function homeImage(href, title, text) {
  var imageInformations = getImageInfo(href, title, text);

  imageInformations.original    = imageInformations.href;
  imageInformations.href        = blankGif;
  imageInformations.className   = "hw-projects-lazyload";

  return buildFigure(imageInformations);
};

var projectsImage = function projectsImage(href, title, text) {
  var imageInformations = getImageInfo(href, title, text);
  return buildFigure(imageInformations);
};

['code','blockquote','html','heading','hr','list','listitem','paragraph',
'table','tablerow','tablecell','strong','em','codespan',
'br','del','link','image'].forEach( function (name) {
  titleRenderer[name] = noop;
});
titleRenderer.heading       = titleHeading;

bodyRenderer.heading        = bodyHeading;
bodyRenderer.list           = list;
bodyRenderer.blockquote     = blockquote;
bodyRenderer.paragraph      = paragraph;
bodyRenderer.image          = homeImage;

projectsRenderer.heading    = heading;
projectsRenderer.list       = list;
projectsRenderer.blockquote = blockquote;
projectsRenderer.paragraph  = paragraph;
projectsRenderer.image      = projectsImage;

exports.home                = titleRenderer;
exports.xhr                 = bodyRenderer;
exports.project             = projectsRenderer;
