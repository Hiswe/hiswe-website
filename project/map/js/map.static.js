(function(h, $) {
	h.object('map.static', 'map.coordinate', {
		options: {
			mapX: 0,
			mapY: 0,
			mapZ: 0,
			height: 0,
			template: '<div class="cell" />',
			layerIndex: 0,
			$parent: $('body')
		},
		_create: function () {
			var o = this.options;
			this.name = '['+o.layerIndex+']['+o.mapX+'-'+o.mapY+']';
			this._build();
			this._bindActions();
		},
		_bindActions: function () {
			$.subscribe(this.name, $.proxy(this._bridge, this));
			/*
			$.subscribe(this.name, function (data) {
				h.debug(data);
			});
			//*/
		},
		_build: function () {
			var x = this.options.mapX,
				y = this.options.mapY,
				z = this.options.mapZ,
				height = this.options.height;

			this.$cell = $(this.options.template)
						.width(h.settings.map.cell.width)
						.height(h.settings.map.cell.height + h.settings.map.cell.height*height)
						.attr('id', this.name);

			this._positionCell(x, y, z);
			this.$cell.appendTo(this.options.$parent);
		},
		/*
		_bridge: function (methodName, params) {
			// utilitary function working with pub sub
			// default access to public method via a callback
			h.debug(this);
			h.debug(methodName);
			if (!/^_/.test(methodName) && $.isFunction(this[methodName])) {
				if ($.isArray(params)){
					return this[methodName].apply(this, params);
				} else {
					return this[methodName].apply(this, [params]);
				}
			}
		},
		//*/
		getPosition: function () {
			var o = this.options;
			var position = {
				layer: o.layerIndex,
				mapX: o.mapX,
				mapY: o.mapY,
				mapZ: o.mapZ,
				height: o.height,
			}
			return position
		},
		getUpperZ: function () {
			return this.options.mapZ + this.options.height;
		},
		_positionCell: function (mapX, mapY, mapZ) {
			var coord = this._mapToScreen(mapX, mapY, mapZ),
				height = h.settings.map.cell.height*this.options.height,
				top = coord.screenY - height,
				zindex = (mapX + mapY ) * h.settings.game.world.layers + this.options.layerIndex;

			this.$cell.css({
				'left': coord.screenX+'px',
				'top': top+'px',
				'z-index': zindex
			});
		}
	});
}(hiswe, jQuery));