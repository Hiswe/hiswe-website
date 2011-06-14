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
	h.object('test.blinking', 'test.transparent',{
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

/*
(function(h, $){
		// équivalent à $.extend mais avec une fonction super
		// le super de test_transparent appele tes.roundCorner même si test.transparent à besoin de test.static
		// décorateur = surcouche de fonction

	h.object('test.priseDeTete', 'decorator.transparent', 'decorator.roundCorner', 'test.static');
}(hiswe, jQuery));


(function(h, $){
	h.object('test.chouette', 'decorator.blinking', 'test.priseDeTete', {

	});
}(hiswe, jQuery));


(function(h, $){
		// équivalent à $.extend mais avec une fonction super
		// le super de test_transparent appele tes.roundCorner même si test.transparent à besoin de test.static
		// suppression du reste de la chaîne ...

		// Regarder les mixins
	 	// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript

	h.object('test.bidule', 'test.priseDeTete', {
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
	h.object('test.blinkingRound', 'test.blinkingRound' , 'test.transparentRound',{
		options: {
			duration: 500
		},
		_create: function () {
			this._decorator('test.static');
			this._decorator('test.blinking');
			this._decorator('test.transparent');
			this._decorator('test.round');

				// my glorious code
		}
	});
}(hiswe, jQuery));


(function(h, $){

	test.pouic = h.decorate('test.static', 'test.round' ,'test.transparent', {

	});
}(hiswe, jQuery));
//*/