(function(h, $){
	h.object('test.static',{
		_create: function () {
			h.debug('info','['+this.options.object+'] Create');
			this._makeCache();
			this._positionElement();
			this._colorElement();
			this._born();
		},
		_born: function () {
			this.$element.appendTo(this.$parent);
		},
		_colorElement: function () {
			h.debug('['+this.options.object+'] Color element');
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
			h.debug('['+this.options.object+'] Make cache');
			this.$parent = $('#frame');
			this.$element  = $('<div />', {
				'class': 'static'
			});
		},
		_positionElement: function () {
			h.debug('['+this.options.object+'] Position element');
			var rand = this._randomPosition(),
				left = rand.left,
				top = rand.top;
			h.debug('['+this.options.object+']','My position is :: x', left, '| y', top);
			this.$element
				.css({
					left: left+'px',
					top: top+'px'
				})
		},
		_randomPosition: function () {
			return {
				left: Math.round(this.$parent.width() * Math.random()),
				top: Math.round(this.$parent.height() * Math.random())
			}
		}
	});
}(hiswe, jQuery));

(function(h, $){
	h.object('test.transparent', 'test.static', {
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
	h.object('test.roundCorner', 'test.static', {
		options: {
			radius: 10
		},
		_create: function () {
			this._super('_create',arguments);
			this.$element.addClass('border');
			this._roundCorner();
		},
		_roundCorner: function () {
			this.$element.css({
				"border-radius": this.options.radius,
           		"-moz-border-radius": this.options.radius,
           		"-webkit-border-radius": this.options.radius
			});
		}
	});
}(hiswe, jQuery));

(function(h, $){
	h.object('test.blinking', 'test.transparent', {
		options: {
			duration: 500
		},
		_create: function () {
			this._super('_create',arguments);
			this._blink();
		},
		_setWidth: function () {
			this._super('_setWidth');
			this.$element.css({
				width: '100px'
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
	h.object('test.moving', 'test.transparent',{
		_create: function () {
			this._super('_create',arguments);
			this._move();
		},
		_setWidth: function () {
			this._super('_setWidth');
			this.$element.css({
				width: '75px'
			});
		},
		_move: function () {
			//h.debug('['+this.options.object+']','Blink');
			rand = this._randomPosition();
			this.$element.animate({
				top: rand.top+'px',
				left: rand.left+'px',
			},{
				duration: this.options.duration,
				complete: $.proxy(this._move, this)
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
		}),
		dget = h.testBlinking({
			duration: 1100
		}),
		cracra = h.testMoving({
			duration: 2000
		}),
		poui = h.testMoving({
			duration: 300
		}),
		gloubi = h.testRoundCorner();


}(hiswe, jQuery));