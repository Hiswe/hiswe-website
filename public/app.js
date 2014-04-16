(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, Contact, Controller, Projects, Services, options,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

Services = require('./services.coffee');

Projects = require('./projects.coffee');

Contact = require('./contact.coffee');

options = require('../../../config/datas/stylus-var.json');

App = (function(_super) {
  __extends(App, _super);

  App.prototype.trace = false;

  App.prototype.logPrefix = '[APP]';

  App.prototype.elements = {
    'body': 'body'
  };

  function App() {
    App.__super__.constructor.apply(this, arguments);
    this.log('init');
    this.body.removeClass('preload');
    this.instanciate();
    this.bodyEvents();
    this;
  }

  App.prototype.instanciate = function() {
    this.services = new Services({
      el: $('section.hw-services')
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
        _this.log('body click');
        return _this.services.e.trigger('clean');
      };
    })(this));
    this.projects.e.on('open', (function(_this) {
      return function() {
        _this.log('projects open');
        return _this.body.addClass(options.activeBody);
      };
    })(this));
    return this.projects.e.on('close', (function(_this) {
      return function() {
        _this.log('projects close');
        return _this.body.removeClass(options.activeBody);
      };
    })(this));
  };

  return App;

})(Controller);

module.exports = App;


},{"../../../config/datas/stylus-var.json":8,"./contact.coffee":3,"./front-controller.coffee":4,"./projects.coffee":6,"./services.coffee":7}],2:[function(require,module,exports){
var App;

App = require('./app.coffee');

jQuery(function() {
  return window.app = new App({
    el: $('html')
  });
});


},{"./app.coffee":1}],3:[function(require,module,exports){
var Contact, Controller,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

Contact = (function(_super) {
  __extends(Contact, _super);

  Contact.prototype.trace = false;

  Contact.prototype.logPrefix = '[CONTACT]';

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
    return $target.on('transitionend', function() {
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
    this.timer = window.setTimeout((function(_this) {
      return function() {
        return _this.discardMessage({
          currentTarget: $msg
        });
      };
    })(this), this.removeDelay);
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
var Controller,
  __slice = [].slice;

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
      args.unshift(this.logPrefix);
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
      args.unshift(this.logPrefix);
    }
    if (typeof console !== "undefined" && console !== null) {
      if (typeof console.warn === "function") {
        console.warn.apply(console, args);
      }
    }
    return this;
  };

  Controller.prototype.delay = function(func, timeout) {
    return setTimeout(this.proxy(func), timeout || 1);
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
    this.options = options || {};
    _ref = this.options;
    for (key in _ref) {
      value = _ref[key];
      this[key] = value;
    }
    if (!((this.el != null) && this.el.length)) {
      return this.warn('initialization aborted');
    }
    this.e = $({});
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
var Controller, ServicesCarrousel, options,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

options = require('../../../config/datas/stylus-var.json');

ServicesCarrousel = (function(_super) {
  __extends(ServicesCarrousel, _super);

  ServicesCarrousel.prototype.trace = true;

  ServicesCarrousel.prototype.logPrefix = '[CARROUSEL]';

  ServicesCarrousel.prototype.count = 0;

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
    if (!Modernizr.csstransforms) {
      return;
    }
    ServicesCarrousel.__super__.constructor.apply(this, arguments);
    if (!this.el.length) {
      return;
    }
    this.log('Init');
    this.el.data('carrousel', true);
    this.el.addClass(options.carrouselClass);
    this.galleryWidth = this.gallery.width();
    this.li.eq(0).addClass(options.carrouselClassSelected);
    this;
  }

  ServicesCarrousel.prototype.getNodesAndDirection = function(event) {
    var $current, $next, nextNodeIndex, sign;
    $current = this.li.eq(this.count);
    $next = $(event.currentTarget);
    nextNodeIndex = this.li.index($next);
    sign = nextNodeIndex > this.count ? 1 : -1;
    this.log('move from', this.count, 'to', nextNodeIndex);
    this.count = nextNodeIndex;
    return {
      $current: $current,
      $next: $next,
      sign: sign
    };
  };

  ServicesCarrousel.prototype.circle = function(event) {
    var adjustedTransform, currentTransform, infos;
    this.log('circle');
    event.preventDefault();
    event.stopImmediatePropagation();
    infos = this.getNodesAndDirection(event);
    if (infos.$next.hasClass(options.carrouselClassSelected)) {
      return;
    }
    infos.$current.removeClass(options.carrouselClassSelected);
    infos.$next.addClass(options.carrouselClassSelected);
    currentTransform = infos.$next.position().left * -1;
    adjustedTransform = this.count === 0 ? currentTransform : currentTransform + (this.galleryWidth * 0.1);
    return this.list.css({
      transform: "translate3d(" + adjustedTransform + "px, 0px, 0px)"
    });
  };

  return ServicesCarrousel;

})(Controller);

module.exports = ServicesCarrousel;


},{"../../../config/datas/stylus-var.json":8,"./front-controller.coffee":4}],6:[function(require,module,exports){
var Carrousel, Controller, Projects, options,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

Carrousel = require('./projects-carrousel.coffee');

options = require('../../../config/datas/stylus-var.json');

Projects = (function(_super) {
  __extends(Projects, _super);

  Projects.prototype.trace = true;

  Projects.prototype.logPrefix = '[PROJECTS]';

  Projects.prototype.opened = false;

  Projects.prototype.elements = {
    '.hw-projects-item': 'all',
    '.hw-projects-content-container': 'content'
  };

  Projects.prototype.events = {
    'tap .hw-projects-item': 'open',
    'tap .hw-projects-content-container': 'close',
    'transitionend .hw-projects-item': 'transitionend'
  };

  function Projects() {
    Projects.__super__.constructor.apply(this, arguments);
    if (!this.el.length) {
      return;
    }
    this.log('Init');
    this;
  }

  Projects.prototype.currentPanel = function() {
    return this.all.filter("." + options.activeClass);
  };

  Projects.prototype.clean = function() {
    this.currentPanel().heventRemoveClass(options.activeClass);
    return this;
  };

  Projects.prototype.transitionend = function(event) {
    var $currentPanel, e, propertyName;
    e = event.originalEvent;
    if (event.originalEvent == null) {
      return;
    }
    propertyName = e.propertyName;
    if (!/^top|opacity$/.test(propertyName)) {
      return;
    }
    if (this.opened === true && propertyName === 'top') {
      this.log('transition end::', 'close');
      this.el.css('z-index', 1);
      this.e.trigger('close');
      this.opened = false;
    } else if (this.opened === false && propertyName === 'opacity') {
      this.log('transition end ::', 'open');
      $currentPanel = this.currentPanel();
      if (!$currentPanel.data('carrousel')) {
        new Carrousel({
          el: $currentPanel
        });
      }
      this.opened = true;
    }
    return this;
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
    $target.heventAddClass(options.activeClass);
    this.e.trigger('open');
    return this;
  };

  Projects.prototype.close = function(e) {
    this.log('Projects close');
    e.preventDefault();
    e.stopImmediatePropagation();
    this.clean();
    return this;
  };

  return Projects;

})(Controller);

module.exports = Projects;


},{"../../../config/datas/stylus-var.json":8,"./front-controller.coffee":4,"./projects-carrousel.coffee":5}],7:[function(require,module,exports){
var Controller, Services, options,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('./front-controller.coffee');

options = require('../../../config/datas/stylus-var.json');

Services = (function(_super) {
  __extends(Services, _super);

  Services.prototype.trace = false;

  Services.prototype.logPrefix = '[SERVICES]';

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
    this.e.on('clean', (function(_this) {
      return function() {
        return _this.clean();
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
      this.e.trigger('close');
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
    this.e.trigger('open');
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


},{"../../../config/datas/stylus-var.json":8,"./front-controller.coffee":4}],8:[function(require,module,exports){
module.exports={
  "activeClass"     : "hw-panel-active",
  "activeBody"      : "hw-body-active",
  "carrouselClass"  : "hw-carrousel",
  "carrouselClassSelected"  : "hw-carrousel-selected"
}
},{}]},{},[2])