(function(h, $){
	h.object('test.static',{
		_create: function () {
			this._makeCache();
			this._positionElement();
			this._colorElement();
			this._born();
		},
		_born: function () {
			this.$element.appendTo(this.$parent);
		},
		_colorElement: function () {
			function rand255 () {
				return Math.round(255 * Math.random());
			}
			var color = ['rgb(',[], ')'];
			for (var i = 0; i<3 ; i++){
				color[1].push( rand255() );
			}
			color[1] = color[1].join(',');
			this.$element.css({
				'background': color.join('')
			});
			h.debug('['+this.options.object+'] color :', color.join(''));
		},
		_makeCache: function () {
			this.$parent = $('#frame');
			this.$element  = $('<div />', {
				'class': 'static'
			});
		},
		_positionElement: function () {
			var left = Math.round(this.$parent.width() * Math.random()),
				top = Math.round(this.$parent.height() * Math.random());
			h.debug('['+this.options.object+']','My position is :: x', left, '| y', top);
			this.$element
				.css({
					left: left+'px',
					top: top+'px'
				})
		}
	});
}(hiswe, jQuery));

(function(h, $){
	h.object('test.transparent', 'test.static',{
		_create: function () {
			this._super('_create',arguments);
			this._opacity();
			this._setWidth();
		},
		_setWidth: function () {
			this.$element.css({
				width: '40px',
				height: '40px'
			});
		},
		_opacity: function () {
			this.$element.css({
				opacity: Math.random()
			})
		}
	});
}(hiswe, jQuery));

(function(h, $){
	h.object('test.blinking', 'test.transparent', 'test.static' ,{
		options: {
			duration: 500
		},
		_create: function () {
			this._super('_create',arguments);
			this._blink();
		},
		_setWidth: function () {
			this.$element.css({
				width: '50px',
				height: '50px'
			});
		},
		_blink: function () {
			//h.debug('['+this.options.object+']','Blink');
			this.$element.animate({
				opacity: Math.random()
			},{
				duration: this.options.duration,
				complete: $.proxy(this._blink, this)
			});
		}
	});
}(hiswe, jQuery));

(function(h, $){

	var pata = h.testStatic(),
		pon = h.testStatic(),
		foo = h.testTransparent(),
		bar = h.testTransparent(),
		wi = h.testBlinking({
			duration: 300
		});
		dget = h.testBlinking({
			duration: 1100
		});


}(hiswe, jQuery));