'use strict';

var marked = require('marked');
var r = new marked.Renderer();

r.heading = function (text, level) {
  var escapedText = text.replace(/-/gi, ' ');
  if (level === 4) {
    return [
      '<h' + level + ' class="hw-projects-center">' + escapedText + '</h' + level + '>'
    ].join('\n')
  }
  return [
    '<h' + level + '>' + escapedText + '</h' + level + '>',
  ].join('\n')
};

r.list = function (body, ordered) {
  if (ordered) {
    return [
      '<ol>' + body + '</ol>'
    ].join('\n');
  }
  return [
    '<div class="hw-projects-gallery-container">',
      '<div class="hw-projects-gallery">',
        '<ul>' + body  + '</ul>',
      '</div>',
    '</div>'
  ].join('\n');
};

r.blockquote = function (quote) {
  return [
    '<aside class="hw-projects-aside-container">',
      '<div class="hw-projects-aside">' + quote + '</div>',
    '</aside>'
  ].join('\n');
};

r.paragraph = function (text) {
  return [
    '<p class="hw-projects-center">' + text + '</p>'
  ].join('\n');
};

r.image = function (href, title, text) {
  var type = /\.svg$/.test(href) ? 'hw-projects-image-vector' : 'hw-projects-image-pixel';
  var imageMarkup =  [
    '<figure class="' + type + '">',
      '<img src="' + href + '"/>',
    '</figure>'
  ];

  if (typeof title !== "undefined" && title !== null && title !== null) {
    imageMarkup[1] = '<img src="' + href + '" alt="' + title + '"/>';
  }
  if (typeof text !== "undefined" && text !== null && text !== '') {
    imageMarkup.splice(2, 0,'<figcaption>' + text + '</figcaption>');
  }

  return imageMarkup.join('\n')
};

module.exports = r;
