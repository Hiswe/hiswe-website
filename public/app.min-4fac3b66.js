!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module){var App,Contact,Controller,Projects,Services,options,__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Controller=require("./front-controller.coffee"),Services=require("./services.coffee"),Projects=require("./projects.coffee"),Contact=require("./contact.coffee"),options=require("../../../config/datas/stylus-var.json"),App=function(_super){function App(){App.__super__.constructor.apply(this,arguments),this.log("init"),this.body.removeClass("preload"),this.instanciate(),this.bodyEvents()}return __extends(App,_super),App.prototype.trace=!0,App.prototype.logPrefix="[APP]",App.prototype.elements={body:"body"},App.prototype.instanciate=function(){return this.services=new Services({el:$("section.hw-services")}),this.projects=new Projects({el:$("section.hw-projects")}),this.contact=new Contact({el:$("form.hw-contact-form")})},App.prototype.bodyEvents=function(){return this.body.on("tap",function(_this){return function(){return _this.log("body click"),_this.services.e.trigger("clean")}}(this)),this.projects.e.on("open",function(_this){return function(){return _this.log("projects open"),_this.body.addClass(options.activeBody)}}(this)),this.projects.e.on("close",function(_this){return function(){return _this.log("projects close"),_this.body.removeClass(options.activeBody)}}(this))},App}(Controller),module.exports=App},{"../../../config/datas/stylus-var.json":8,"./contact.coffee":3,"./front-controller.coffee":4,"./projects.coffee":6,"./services.coffee":7}],2:[function(require){var App;App=require("./app.coffee"),jQuery(function(){return window.app=new App({el:$("html")})})},{"./app.coffee":1}],3:[function(require,module){var Contact,Controller,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Controller=require("./front-controller.coffee"),Contact=function(_super){function Contact(){this.always=__bind(this.always,this),this.error=__bind(this.error,this),this.success=__bind(this.success,this),Contact.__super__.constructor.apply(this,arguments),this.el.length&&this.log("init")}return __extends(Contact,_super),Contact.prototype.trace=!1,Contact.prototype.logPrefix="[CONTACT]",Contact.prototype.removeDelay=5e3,Contact.prototype.elements={"input, textarea, button":"all"},Contact.prototype.events={submit:"submit","click p":"discardMessage"},Contact.prototype.discardMessage=function(e){var $target;return this.log("discard"),$target=$(e.currentTarget),window.clearTimeout(this.timer),$target.on("transitionend",function(){return $(this).remove()}).addClass("remove")},Contact.prototype.addMessage=function(type,text){var $msg,msg;return null==type&&(type="success"),null==text&&(text="send"),msg=['<p class="hw-message-',type,'">',text,"</p>"],$msg=$(msg.join("")).prependTo(this.el),this.timer=window.setTimeout(function(_this){return function(){return _this.discardMessage({currentTarget:$msg})}}(this),this.removeDelay),this},Contact.prototype.submit=function(e){var data;return this.log("submit"),e.preventDefault(),data={},$.each(this.el.serializeArray(),function(index,item){return data[item.name]=item.value}),this.all.attr("disabled",!0),$.post("/contact",data).done(this.success).fail(this.error).always(this.always)},Contact.prototype.success=function(res){return this.log("success",res),this.addMessage("success",res.message)},Contact.prototype.error=function(res){return this.log("error",res.responseText),this.addMessage("error",res.responseText)},Contact.prototype.always=function(){return this.log("always"),this.refreshElements(),this.all.attr("disabled",!1)},Contact}(Controller),module.exports=Contact},{"./front-controller.coffee":4}],4:[function(require,module){var Controller,__slice=[].slice;Controller=function(){function Controller(options){var key,value,_ref;this.options=options||{},_ref=this.options;for(key in _ref)value=_ref[key],this[key]=value;return null!=this.el&&this.el.length?(this.e=$({}),this.elements&&this.refreshElements(),void(this.events&&this.delegateEvents(this.events))):this.warn("initialization aborted")}return Controller.prototype.eventSplitter=/^(\S+)\s*(.*)$/,Controller.prototype.trace=!1,Controller.prototype.logPrefix="(App)",Controller.prototype.log=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],this.trace?(this.logPrefix&&args.unshift(this.logPrefix),"undefined"!=typeof console&&null!==console&&"function"==typeof console.log&&console.log.apply(console,args),this):void 0},Controller.prototype.warn=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],this.trace?(this.logPrefix&&args.unshift(this.logPrefix),"undefined"!=typeof console&&null!==console&&"function"==typeof console.warn&&console.warn.apply(console,args),this):void 0},Controller.prototype.delay=function(func,timeout){return setTimeout(this.proxy(func),timeout||1)},Controller.prototype.proxy=function(func){return function(_this){return function(){return func.apply(_this,arguments)}}(this)},Controller.prototype.$=function(selector){return $(selector,this.el)},Controller.prototype.refreshElements=function(){var key,value,_ref,_results;_ref=this.elements,_results=[];for(key in _ref)value=_ref[key],_results.push(this[value]=this.$(key));return _results},Controller.prototype.delegateEvents=function(events){var eventName,key,match,method,selector,_results;_results=[];for(key in events){if(method=events[key],"function"==typeof method)method=function(_this){return function(method){return function(){return method.apply(_this,arguments),!0}}}(this)(method);else{if(!this[method])throw new Error(""+method+" doesn't exist");method=function(_this){return function(method){return function(){return _this[method].apply(_this,arguments),!0}}}(this)(method)}match=key.match(this.eventSplitter),eventName=match[1],selector=match[2],_results.push(""===selector?this.el.on(eventName,method):this.el.on(eventName,selector,method))}return _results},Controller}(),module.exports=Controller},{}],5:[function(require,module){var Controller,ServicesCarrousel,options,__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Controller=require("./front-controller.coffee"),options=require("../../../config/datas/stylus-var.json"),ServicesCarrousel=function(_super){function ServicesCarrousel(){return Modernizr.csstransforms?(ServicesCarrousel.__super__.constructor.apply(this,arguments),this.el.length?(this.log("Init"),this.el.data("carrousel",!0),this.el.addClass(options.carrouselClass),this.galleryWidth=this.gallery.width(),void this.li.eq(0).addClass(options.carrouselClassSelected)):this.warn("No element defined")):this.warn("No css transform available")}return __extends(ServicesCarrousel,_super),ServicesCarrousel.prototype.trace=!0,ServicesCarrousel.prototype.logPrefix="[CARROUSEL]",ServicesCarrousel.prototype.count=0,ServicesCarrousel.prototype.galleryWidth=null,ServicesCarrousel.prototype.events={"tap .hw-projects-gallery li":"circle"},ServicesCarrousel.prototype.elements={".hw-projects-gallery":"gallery",ul:"list",".hw-projects-gallery li":"li"},ServicesCarrousel.prototype.getNodes=function(event){var $current,$next,nextNodeIndex;return $current=this.li.eq(this.count),$next=$(event.currentTarget),nextNodeIndex=this.li.index($next),this.log("move from",this.count,"to",nextNodeIndex),this.count=nextNodeIndex,{$current:$current,$next:$next}},ServicesCarrousel.prototype.circle=function(event){var adjustedTransform,currentTransform,el;return this.log("circle"),event.preventDefault(),event.stopImmediatePropagation(),el=this.getNodes(event),el.$next.hasClass(options.carrouselClassSelected)?void 0:(el.$current.removeClass(options.carrouselClassSelected),el.$next.addClass(options.carrouselClassSelected),currentTransform=-1*el.$next.position().left,adjustedTransform=0===this.count?currentTransform:currentTransform+.1*this.galleryWidth,this.list.css({transform:"translate3d("+adjustedTransform+"px, 0px, 0px)"}),this)},ServicesCarrousel}(Controller),module.exports=ServicesCarrousel},{"../../../config/datas/stylus-var.json":8,"./front-controller.coffee":4}],6:[function(require,module){var Carrousel,Controller,Projects,options,__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Controller=require("./front-controller.coffee"),Carrousel=require("./projects-carrousel.coffee"),options=require("../../../config/datas/stylus-var.json"),Projects=function(_super){function Projects(){Projects.__super__.constructor.apply(this,arguments),this.el.length&&this.log("Init")}return __extends(Projects,_super),Projects.prototype.trace=!0,Projects.prototype.logPrefix="[PROJECTS]",Projects.prototype.opened=!1,Projects.prototype.elements={".hw-projects-item":"all",".hw-projects-content-container":"content"},Projects.prototype.events={"tap .hw-projects-item":"open","tap .hw-projects-close":"close","transitionend .hw-projects-item":"transitionend"},Projects.prototype.currentPanel=function(){return this.all.filter("."+options.activeClass)},Projects.prototype.clean=function(){return this.currentPanel().heventRemoveClass(options.activeClass),this},Projects.prototype.transitionend=function(event){var $currentPanel,e,propertyName;return e=event.originalEvent,null!=event.originalEvent&&(propertyName=e.propertyName,/^top|opacity$/.test(propertyName)&&/content|cover/.test(event.target.className))?(this.opened===!0&&"top"===propertyName?(this.log("transition end::","close"),this.el.css("z-index",1),this.e.trigger("close"),this.opened=!1):this.opened===!1&&"opacity"===propertyName&&(this.log("transition end ::","open"),$currentPanel=this.currentPanel(),$currentPanel.data("carrousel")||new Carrousel({el:$currentPanel}),this.opened=!0),this):void 0},Projects.prototype.open=function(e){var $target;return $target=$(e.currentTarget),e.stopPropagation(),$target.hasClass(options.activeClass)?void 0:(this.log("Projects open"),e.preventDefault(),this.clean(),this.el.css("z-index",2),$target.heventAddClass(options.activeClass),this.e.trigger("open"),this)},Projects.prototype.close=function(e){return this.log("Projects close"),e.preventDefault(),e.stopImmediatePropagation(),this.clean(),this},Projects}(Controller),module.exports=Projects},{"../../../config/datas/stylus-var.json":8,"./front-controller.coffee":4,"./projects-carrousel.coffee":5}],7:[function(require,module){var Controller,Services,options,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Controller=require("./front-controller.coffee"),options=require("../../../config/datas/stylus-var.json"),Services=function(_super){function Services(){this.clean=__bind(this.clean,this),Services.__super__.constructor.apply(this,arguments),this.el.length&&(this.log("Init"),this.e.on("clean",function(_this){return function(){return _this.clean()}}(this)))}return __extends(Services,_super),Services.prototype.trace=!1,Services.prototype.logPrefix="[SERVICES]",Services.prototype.opened=!1,Services.prototype.elements={".hw-services-item":"servicePanels",".hw-sub-close":"closeButton"},Services.prototype.events={"tap .hw-services-item":"open","tap .hw-sub-close":"close","transitionend .hw-services-item":"transitionend"},Services.prototype.clean=function(){var $panel;return this.log("clean"),$panel=this.servicePanels.filter("."+options.activeClass),$panel.heventRemoveClass(options.activeClass),this},Services.prototype.transitionend=function(event){var e;return e=event.originalEvent,null!=event.originalEvent&&/cover/.test(event.target.className)&&/transform/.test(e.propertyName)?this.opened===!0?(this.log("transition end::","close"),this.el.css("z-index",1),this.e.trigger("close"),this.opened=!1):(this.log("transition end ::","open"),this.opened=!0):void 0},Services.prototype.open=function(e){var $target;return this.log("Service open"),$target=$(e.currentTarget),e.stopPropagation(),$target.hasClass(options.activeClass)?void 0:(e.preventDefault(),this.clean(),this.el.css("z-index",2),$target.heventAddClass(options.activeClass),this.e.trigger("open"),this)},Services.prototype.close=function(e){return this.log("Service close"),e.preventDefault(),e.stopImmediatePropagation(),this.clean(),this},Services}(Controller),module.exports=Services},{"../../../config/datas/stylus-var.json":8,"./front-controller.coffee":4}],8:[function(require,module){module.exports={activeClass:"hw-panel-active",activeBody:"hw-body-active",carrouselClass:"hw-carrousel",carrouselClassSelected:"hw-carrousel-selected"}},{}]},{},[2]);