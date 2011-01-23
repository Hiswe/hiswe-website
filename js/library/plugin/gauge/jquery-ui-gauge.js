/*
 * jQuery UI Gauge 0.5
 *
 * Copyright 2010, Hiswe (hiswehalya@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/ TODO : make doc
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function($) {
$.widget("ui.gauge", {
	options: {
		'height': "7.146em",
		'background' : "",
		'easing' : "easeOutBounce" 
	},
	_create: function() {
		this.$value = this.element.find('dd');
		this.$barContainer = $('<dd />',{
			'class' : 'gaugeValue',
			'style' : 'height:'+this.options.height
		});
		var cssBar = {'top' : '100%'}
		if (this.options.backgroundColor){
			cssBar.background = this.options.backgroundColor
		}
		this.$bar = $('<span />',{
			'class' : 'gaugeBar'
		}).css(cssBar);
		this.$barContainer
			.append(this.$bar)
			.insertBefore(this.$value);
		// retrieve the percent from the markup
		var domPercent = parseInt(this.$value.text().replace(/^([0-9]*)[%\.,]?[0-9]*[%\.,]?/g, '$1'));
		this.setPercent(domPercent);
	},

	enable: function() {
		this.options.disabled = false;
	},

	disable: function() {
		this.options.disabled = true;
	},

	destroy: function() {
		this.$barContainer.remove();
		$.Widget.prototype.destroy.apply(this, arguments);
	},
	setPercent: function(value){
		this.percent = Math.min(Math.abs(value), 100);
		this.invertPercent = 100 - this.percent;
		
		this.$value.text(this.percent+'%' ); 
		this.$bar.animate({
			'top' : this.invertPercent+'%'
		}, 1000, this.options.easing);
	},
	getPercent : function(){
		return this.percent;
	}
	
});

})(jQuery);