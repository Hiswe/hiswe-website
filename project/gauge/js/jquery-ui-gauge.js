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
		'background-color' : "#FC0C8A",
		'easing' : "easeOutBounce" 
	},
	_create: function() {
		this.$value = this.element.find('dd');
		this.$barContainer = $('<dd />',{
			'class' : 'gaugeValue',
			'style' : 'height:'+this.options.height
		});
		this.$bar = $('<span />',{
			'class' : 'gaugeBar'
		}).css({
			'background' : this.options['background-color'],
			'top' : '100%'			
		});
		this.$barContainer
			.append(this.$bar)
			.insertBefore(this.$value);
		this.setPercent(parseInt(this.$value.text().replace(/^([0-9]*)[%\.,]?[0-9]*[%\.,]?/g, '$1')));
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
		
		this.$bar.animate({
			'top' : this.invertPercent+'%'
		}, 1000, this.options.easing);
	},
	getPercent : function(){
		return this.percent;
	}
	
});

})(jQuery);