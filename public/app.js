(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, Contact, Controller, Projects, Services, options, pubsub,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

Services = require('./services.coffee');

Projects = require('./projects.coffee');

Contact = require('./contact.coffee');

pubsub = require('./pubsub.coffee');

options = require('../../shared/stylus-var.json');

App = (function(_super) {
  __extends(App, _super);

  App.prototype.trace = false;

  App.prototype.logPrefix = 'APP';

  App.prototype.elements = {
    'body': 'body',
    'section.hw-services': 'servicesContainer'
  };

  function App() {
    App.__super__.constructor.apply(this, arguments);
    this.log('init');
    this.body.removeClass('prevent-transition');
    this.getPixelRatio();
    this.instanciate();
    this.bodyEvents();
    this;
    pubsub('resizeStart').subscribe((function(_this) {
      return function() {
        return _this.body.addClass('prevent-transition');
      };
    })(this));
    pubsub('resizeEnd').subscribe((function(_this) {
      return function() {
        return _this.body.removeClass('prevent-transition');
      };
    })(this));
  }

  App.prototype.instanciate = function() {
    this.services = new Services({
      el: this.servicesContainer
    });
    this.projects = new Projects({
      el: $('section.hw-projects')
    });
    return this.contact = new Contact({
      el: $('form.hw-contact-form')
    });
  };

  App.prototype.bodyEvents = function() {
    this.body.on('tap', (function(_this) {
      return function() {
        var _ref;
        _this.log('body click');
        return (_ref = _this.services.e) != null ? _ref.trigger('clean') : void 0;
      };
    })(this));
    return pubsub('projects').subscribe((function(_this) {
      return function(event) {
        if (event === 'openStart') {
          _this.log('projects open');
          _this.body.css('overflow', 'hidden');
        }
        if (event === 'closeEnd') {
          _this.log('projects close');
          return _this.body.css('overflow', 'auto');
        }
      };
    })(this));
  };

  App.prototype.getPixelRatio = function() {
    var pixelRatio;
    pixelRatio = window.devicePixelRatio != null ? window.devicePixelRatio : 1;
    return Controller.prototype.pixelRatio = pixelRatio;
  };

  return App;

})(Controller);

module.exports = App;


},{"../../shared/stylus-var.json":9,"./contact.coffee":3,"./front-controller.coffee":4,"./projects.coffee":6,"./pubsub.coffee":7,"./services.coffee":8}],2:[function(require,module,exports){
var App, pubsub;

App = require('./app.coffee');

pubsub = require('./pubsub.coffee');

jQuery(function() {
  var resizeTimer;
  window.app = new App({
    el: $('html')
  });
  resizeTimer = null;
  $(window).on('resize', function() {
    if (!resizeTimer) {
      pubsub('resizeStart').publish();
    }
    window.clearTimeout(resizeTimer);
    return resizeTimer = window.setTimeout(function() {
      pubsub('resizeEnd').publish();
      return resizeTimer = null;
    }, 300);
  });
  return $('body').on('tap', function() {
    return pubsub('body').publish('tap');
  });
});


},{"./app.coffee":1,"./pubsub.coffee":7}],3:[function(require,module,exports){
var Contact, Controller,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

Contact = (function(_super) {
  __extends(Contact, _super);

  Contact.prototype.trace = false;

  Contact.prototype.logPrefix = 'CONTACT';

  Contact.prototype.removeDelay = 5000;

  Contact.prototype.elements = {
    'input, textarea, button': 'all'
  };

  Contact.prototype.events = {
    'submit': 'submit',
    'click p': 'discardMessage'
  };

  function Contact() {
    this.always = __bind(this.always, this);
    this.error = __bind(this.error, this);
    this.success = __bind(this.success, this);
    Contact.__super__.constructor.apply(this, arguments);
    if (!this.el.length) {
      return;
    }
    this.log('init');
  }

  Contact.prototype.discardMessage = function(e) {
    var $target;
    this.log('discard');
    $target = $(e.currentTarget);
    window.clearTimeout(this.timer);
    return $target.on('animationend', function() {
      return $(this).remove();
    }).addClass('remove');
  };

  Contact.prototype.addMessage = function(type, text) {
    var $msg, msg;
    if (type == null) {
      type = 'success';
    }
    if (text == null) {
      text = 'send';
    }
    msg = ['<p class="hw-message-', type, '">', text, '</p>'];
    $msg = $(msg.join('')).prependTo(this.el);
    return this;
  };

  Contact.prototype.submit = function(e) {
    var data;
    this.log('submit');
    e.preventDefault();
    data = {};
    $.each(this.el.serializeArray(), function(index, item) {
      return data[item.name] = item.value;
    });
    this.all.attr('disabled', true);
    return $.post('/contact', data).done(this.success).fail(this.error).always(this.always);
  };

  Contact.prototype.success = function(res) {
    this.log('success', res);
    return this.addMessage('success', res.message);
  };

  Contact.prototype.error = function(res) {
    this.log('error', res.responseText);
    return this.addMessage('error', res.responseText);
  };

  Contact.prototype.always = function(res) {
    this.log('always');
    this.refreshElements();
    return this.all.attr('disabled', false);
  };

  return Contact;

})(Controller);

module.exports = Contact;


},{"./front-controller.coffee":4}],4:[function(require,module,exports){
var Controller, uid,
  __slice = [].slice;

uid = 0;

Controller = (function() {
  Controller.prototype.eventSplitter = /^(\S+)\s*(.*)$/;

  Controller.prototype.trace = false;

  Controller.prototype.logPrefix = '(App)';

  Controller.prototype.log = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!this.trace) {
      return;
    }
    if (this.logPrefix) {
      args.unshift("[" + this.logPrefix + " – " + this.uid + "]");
    }
    if (typeof console !== "undefined" && console !== null) {
      if (typeof console.log === "function") {
        console.log.apply(console, args);
      }
    }
    return this;
  };

  Controller.prototype.warn = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!this.trace) {
      return;
    }
    if (this.logPrefix) {
      args.unshift("[" + this.logPrefix + " – " + this.uid + "]");
    }
    if (typeof console !== "undefined" && console !== null) {
      if (typeof console.warn === "function") {
        console.warn.apply(console, args);
      }
    }
    return this;
  };

  Controller.prototype.wait = function(timeout) {
    var dfd;
    dfd = new jQuery.Deferred();
    setTimeout(dfd.resolve, timeout || 1);
    return dfd.promise();
  };

  Controller.prototype.proxy = function(func) {
    return (function(_this) {
      return function() {
        return func.apply(_this, arguments);
      };
    })(this);
  };

  function Controller(options) {
    var key, value, _ref;
    uid = uid + 1;
    this.uid = uid;
    this.options = options || {};
    _ref = this.options;
    for (key in _ref) {
      value = _ref[key];
      this[key] = value;
    }
    if (!((this.el != null) && this.el.length)) {
      return this.warn('initialization aborted');
    }
    if (this.elements) {
      this.refreshElements();
    }
    if (this.events) {
      this.delegateEvents(this.events);
    }
  }

  Controller.prototype.$ = function(selector) {
    return $(selector, this.el);
  };

  Controller.prototype.refreshElements = function() {
    var key, value, _ref, _results;
    _ref = this.elements;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(this[value] = this.$(key));
    }
    return _results;
  };

  Controller.prototype.delegateEvents = function(events) {
    var eventName, key, match, method, selector, _results;
    _results = [];
    for (key in events) {
      method = events[key];
      if (typeof method === 'function') {
        method = (function(_this) {
          return function(method) {
            return function() {
              method.apply(_this, arguments);
              return true;
            };
          };
        })(this)(method);
      } else {
        if (!this[method]) {
          throw new Error("" + method + " doesn't exist");
        }
        method = (function(_this) {
          return function(method) {
            return function() {
              _this[method].apply(_this, arguments);
              return true;
            };
          };
        })(this)(method);
      }
      match = key.match(this.eventSplitter);
      eventName = match[1];
      selector = match[2];
      if (selector === '') {
        _results.push(this.el.on(eventName, method));
      } else {
        _results.push(this.el.on(eventName, selector, method));
      }
    }
    return _results;
  };

  return Controller;

})();

module.exports = Controller;


},{}],5:[function(require,module,exports){
var Controller, ServicesCarrousel, options, pubsub,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

options = require('../../shared/stylus-var.json');

pubsub = require('./pubsub.coffee');

ServicesCarrousel = (function(_super) {
  __extends(ServicesCarrousel, _super);

  ServicesCarrousel.prototype.trace = false;

  ServicesCarrousel.prototype.logPrefix = 'CARROUSEL';

  ServicesCarrousel.prototype.count = 0;

  ServicesCarrousel.prototype.total = 0;

  ServicesCarrousel.prototype.galleryWidth = null;

  ServicesCarrousel.prototype.events = {
    'tap .hw-projects-gallery li': 'circle'
  };

  ServicesCarrousel.prototype.elements = {
    '.hw-projects-gallery': 'gallery',
    'ul': 'list',
    '.hw-projects-gallery li': 'li',
    '.hw-projects-gallery img': 'images'
  };

  function ServicesCarrousel() {
    this.resizeEnd = __bind(this.resizeEnd, this);
    this.updateProgress = __bind(this.updateProgress, this);
    this.loadImage = __bind(this.loadImage, this);
    this.onProgress = __bind(this.onProgress, this);
    ServicesCarrousel.__super__.constructor.apply(this, arguments);
    if (!this.el.length) {
      return this.warn('No element defined');
    }
    if (this.el.hasClass(options.carrouselClass)) {
      return this.warn('Carrousel already intialized');
    }
    this.initCarrousel();
    this.loadImages();
    pubsub('resizeEnd').subscribe(this.resizeEnd);
    this;
  }

  ServicesCarrousel.prototype.initCarrousel = function() {
    if (!Modernizr.csstransforms) {
      this.el.off('tap', '.hw-projects-gallery li');
      return this.warn('No css transform available');
    }
    this.log('Init');
    this.el.addClass(options.carrouselClass);
    this.li.eq(0).addClass(options.carrouselClassSelected);
    this.total = this.li.length;
    this.galleryWidth = this.gallery.width();
    this.log('with', this.total, 'image(s)');
    return this;
  };

  ServicesCarrousel.prototype.loadImages = function() {
    var loadedImages;
    loadedImages = this.initLoading().imagesLoaded();
    loadedImages.progress(this.onProgress).done((function(_this) {
      return function() {
        return _this.log('all images loaded');
      };
    })(this));
    if (Modernizr.progressbar) {
      this.initProgress();
      loadedImages.progress(this.updateProgress);
    }
    return this;
  };

  ServicesCarrousel.prototype.initLoading = function() {
    this.log('Init loading');
    this.images.each(this.loadImage);
    this.refreshElements();
    return this.images;
  };

  ServicesCarrousel.prototype.onProgress = function(instance, image) {
    this.log('on progress');
    return $(image.img).addClass(options.carrouselImageLoaded).css('opacity', '').parent().removeClass('hw-projects-lazyload-loading');
  };

  ServicesCarrousel.prototype.loadImage = function(index, image) {
    var $img, $original, $parent, imgSrc;
    $original = $(image).css('opacity', 0);
    $parent = $original.parent().addClass('hw-projects-lazyload-loading');
    $img = $original.clone();
    imgSrc = $img.data('original');
    $img.attr('src', imgSrc);
    $original.replaceWith($img);
    return this;
  };

  ServicesCarrousel.prototype.initProgress = function() {
    var progressMarkup;
    this.log('Init progress bar');
    this.progressCurrent = 0;
    this.total = this.li.length;
    progressMarkup = '<progress class="bg-projects-progress" value="0"  max="';
    progressMarkup += this.total + '"></progress>';
    return this.progressBar = $(progressMarkup).appendTo(this.el);
  };

  ServicesCarrousel.prototype.updateProgress = function() {
    this.log('update progress bar');
    this.progressCurrent += 1;
    this.progressBar.attr('value', this.progressCurrent);
    if (this.progressCurrent === this.total) {
      return this.progressBar.remove();
    }
  };

  ServicesCarrousel.prototype.resizeEnd = function() {
    this.galleryWidth = this.gallery.width();
    this.moveTo(this.li.eq(this.count));
    return this;
  };

  ServicesCarrousel.prototype.getNodes = function(event) {
    var $current, $next, nextNodeIndex;
    $current = this.li.eq(this.count);
    $next = $(event.currentTarget);
    nextNodeIndex = this.li.index($next);
    this.log('move from', this.count, 'to', nextNodeIndex);
    this.count = nextNodeIndex;
    return {
      $current: $current,
      $next: $next
    };
  };

  ServicesCarrousel.prototype.moveTo = function(selectedImage) {
    var adjustedTransform, currentTransform;
    currentTransform = selectedImage.position().left * -1;
    if (this.count === 0) {
      adjustedTransform = currentTransform;
    } else if (this.count === this.total - 1) {
      adjustedTransform = currentTransform + this.galleryWidth - selectedImage.width();
    } else {
      adjustedTransform = currentTransform + (this.galleryWidth * 0.05);
    }
    this.list.css({
      transform: "translate3d(" + adjustedTransform + "px, 0px, 0px)"
    });
    return this;
  };

  ServicesCarrousel.prototype.circle = function(event) {
    var el;
    this.log('circle');
    el = this.getNodes(event);
    if (el.$next.hasClass(options.carrouselClassSelected)) {
      return;
    }
    el.$current.removeClass(options.carrouselClassSelected);
    el.$next.addClass(options.carrouselClassSelected);
    this.moveTo(el.$next);
    return this;
  };

  return ServicesCarrousel;

})(Controller);

module.exports = ServicesCarrousel;


},{"../../shared/stylus-var.json":9,"./front-controller.coffee":4,"./pubsub.coffee":7}],6:[function(require,module,exports){
var Carrousel, Controller, Projects, options, pubsub,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

Carrousel = require('./projects-carrousel.coffee');

options = require('../../shared/stylus-var.json');

pubsub = require('./pubsub.coffee');

Projects = (function(_super) {
  __extends(Projects, _super);

  Projects.prototype.trace = false;

  Projects.prototype.logPrefix = 'PROJECTS';

  Projects.prototype.opened = false;

  Projects.prototype.elements = {
    '.hw-projects-item': 'all',
    '.hw-projects-content-container': 'content',
    '.hw-projects-content': 'container'
  };

  Projects.prototype.events = {
    'tap .hw-projects-item': 'open',
    'tap .hw-projects-name': 'prevent',
    'tap .hw-projects-close': 'close',
    'transitionend .hw-witness': 'witness'
  };

  function Projects() {
    Projects.__super__.constructor.apply(this, arguments);
    if (!this.el.length) {
      return;
    }
    this.log('Init');
    this.all.append('<dd class="' + options.witness + '"></dd>');
    this.loadCovers();
    this;
  }

  Projects.prototype.prevent = function(event) {
    this.log('prevent', event);
    event.preventDefault();
    return false;
  };

  Projects.prototype.currentPanel = function() {
    return this.all.filter("." + options.activeClass);
  };

  Projects.prototype.clean = function() {
    this.currentPanel().removeClass(options.activeClass).find("." + options.witness).heventRemoveClass(options.activeWitness);
    return this;
  };

  Projects.prototype.loadCovers = function() {
    return this.wait(1000).then((function(_this) {
      return function() {
        _this.log('init load cover');
        return _this.$("." + options.projectCoverLoad).each(function() {
          var $cover, $title, imgMarkup;
          $cover = $(this);
          $title = $cover.find('.hw-projects-name');
          imgMarkup = '<img src="' + $title.data('original') + '" alt="' + $title.data('alt') + '" />';
          return $(imgMarkup).appendTo($cover).imagesLoaded().done(function() {
            return $cover.removeClass(options.projectCoverLoad);
          });
        });
      };
    })(this));
  };

  Projects.prototype.loadBody = function($currentPanel) {
    if ($currentPanel.data('bodyLoaded')) {
      return;
    }
    return this.wait(100).then((function(_this) {
      return function() {
        var href;
        href = $currentPanel.find('a.hw-projects-name').attr('href');
        _this.log('load body', href);
        return $.get(href).success(function(body) {
          var $body;
          $currentPanel.data('bodyLoaded', true);
          $body = $('<div class="hw-projects-content-xhr"></div>').css('opacity', 0).append(body);
          $currentPanel.find('.hw-projects-content').append($body);
          return _this.wait(100).then(function() {
            $body.css('opacity', 1);
            return _this.initCarrousel($currentPanel);
          });
        });
      };
    })(this));
  };

  Projects.prototype.witness = function(event) {
    if (this.opened === true) {
      this.log('witness :: close');
      this.closingTransitionEnd();
    } else {
      this.log('witness :: open');
      this.openingTransitionEnd();
    }
    return this;
  };

  Projects.prototype.openingTransitionEnd = function() {
    var $currentPanel;
    if (this.opened === true) {
      return this;
    }
    this.log('transition end ::', 'open');
    $currentPanel = this.currentPanel();
    this.loadBody($currentPanel);
    pubsub('projects').publish('openEnd');
    return this.opened = true;
  };

  Projects.prototype.closingTransitionEnd = function() {
    if (this.opened === false) {
      return this;
    }
    this.log('transition end::', 'close');
    this.el.css('z-index', 1);
    pubsub('projects').publish('closeEnd');
    return this.opened = false;
  };

  Projects.prototype.initCarrousel = function($currentPanel) {
    var $carrousel;
    $carrousel = $currentPanel.data('carrousel', true).find('.hw-projects-gallery-container');
    this.log('init', $carrousel.length, 'carrousel(s)');
    return $.each($carrousel, function() {
      return new Carrousel({
        el: $(this)
      });
    });
  };

  Projects.prototype.open = function(e) {
    var $target;
    $target = $(e.currentTarget);
    e.stopPropagation();
    if ($target.hasClass(options.activeClass)) {
      return;
    }
    this.log('Projects open');
    e.preventDefault();
    this.clean();
    this.el.css('z-index', 2);
    this.wait(50).then(function() {
      return $target.addClass(options.activeClass);
    });
    $target.find("." + options.witness).heventAddClass(options.activeWitness);
    pubsub('projects').publish('openStart');
    return this;
  };

  Projects.prototype.close = function(e) {
    this.log('Projects close');
    e.preventDefault();
    e.stopImmediatePropagation();
    pubsub('projects').publish('closeStart');
    this.container.scrollTop(0);
    this.clean();
    return this;
  };

  return Projects;

})(Controller);

module.exports = Projects;


},{"../../shared/stylus-var.json":9,"./front-controller.coffee":4,"./projects-carrousel.coffee":5,"./pubsub.coffee":7}],7:[function(require,module,exports){
var pubsub, topics;

topics = {};

pubsub = function(id) {
  var callbacks, topic;
  if (id == null) {
    throw new Error('pubsub need an  id');
  }
  topic = topics[id];
  if (topic == null) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };
    topics[id] = topic;
    return topic;
  }
  return topic;
};

module.exports = pubsub;


},{}],8:[function(require,module,exports){
var Controller, Services, options, pubsub,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

options = require('../../shared/stylus-var.json');

pubsub = require('./pubsub.coffee');

Services = (function(_super) {
  __extends(Services, _super);

  Services.prototype.trace = false;

  Services.prototype.logPrefix = 'SERVICES';

  Services.prototype.opened = false;

  Services.prototype.elements = {
    '.hw-services-item': 'servicePanels',
    '.hw-sub-close': 'closeButton'
  };

  Services.prototype.events = {
    'tap .hw-services-item': 'open',
    'tap .hw-sub-close': 'close',
    'transitionend .hw-services-item': 'transitionend'
  };

  function Services() {
    this.clean = __bind(this.clean, this);
    Services.__super__.constructor.apply(this, arguments);
    if (!this.el.length) {
      return;
    }
    this.log('Init');
    pubsub('body').subscribe((function(_this) {
      return function(event) {
        if (event === 'tap') {
          return _this.clean();
        }
      };
    })(this));
    this;
  }

  Services.prototype.clean = function() {
    var $panel;
    this.log('clean');
    $panel = this.servicePanels.filter("." + options.activeClass);
    $panel.heventRemoveClass(options.activeClass);
    return this;
  };

  Services.prototype.transitionend = function(event) {
    var e;
    e = event.originalEvent;
    if (event.originalEvent == null) {
      return;
    }
    if (!/cover/.test(event.target.className)) {
      return;
    }
    if (!/transform/.test(e.propertyName)) {
      return;
    }
    if (this.opened === true) {
      this.log('transition end::', 'close');
      this.el.css('z-index', 1);
      pubsub('services').publish('close');
      return this.opened = false;
    } else {
      this.log('transition end ::', 'open');
      return this.opened = true;
    }
  };

  Services.prototype.open = function(e) {
    var $target;
    this.log('Service open');
    $target = $(e.currentTarget);
    e.stopPropagation();
    if ($target.hasClass(options.activeClass)) {
      return;
    }
    e.preventDefault();
    this.clean();
    this.el.css('z-index', 2);
    $target.heventAddClass(options.activeClass);
    pubsub('services').publish('open');
    return this;
  };

  Services.prototype.close = function(e) {
    this.log('Service close');
    e.preventDefault();
    e.stopImmediatePropagation();
    this.clean();
    return this;
  };

  return Services;

})(Controller);

module.exports = Services;


},{"../../shared/stylus-var.json":9,"./front-controller.coffee":4,"./pubsub.coffee":7}],9:[function(require,module,exports){
module.exports={
  "activeClass"             : "hw-panel-active",
  "witness"                 : "hw-witness",
  "activeWitness"           : "hw-witness-active",
  "activeBody"              : "hw-body-active",
  "carrouselClass"          : "hw-carrousel",
  "desktopWidth"            : 1080,
  "carrouselHeight"         : 552,
  "carrouselImageLoaded"    : "hw-carrousel-image-loaded",
  "carrouselClassSelected"  : "hw-carrousel-selected",
  "projectCoverLoad"        : "hw-projects-cover-lazyload"
}
},{}]},{},[2])