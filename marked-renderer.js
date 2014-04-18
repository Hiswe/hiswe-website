'use strict';

var marked = require('marked');
var r = new marked.Renderer();

r.heading = function (text, level) {
  var escapedText = text.replace(/-/gi, ' ');
  return [
    '<div class="hw-projects-center">',
      '<h' + level + '>' + escapedText + '</h' + level + '>',
    '</div>'
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
    '<div class="hw-projects-aside">',
      '<aside>' + quote + '</aside>',
    '</div>'
  ].join('\n');
};

r.paragraph = function (text) {
  return [
    '<div class="hw-projects-center">',
      '<p>' + text + '</p>',
    '</div>'
  ].join('\n');
};

module.exports = r;
