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
		_bindActions: $.noop,
		_build: function () {
			var x = this.options.mapX,
				y = this.options.mapY,
				z = this.options.mapZ,
				height = this.options.height;

			this.$cell = $(this.options.template)
						.width(this.options.general.width)
						.height(this.options.general.height + this.options.general.height * height)
						.attr('id', this.name);

			this._positionCell(x, y, z);
			this.$cell.appendTo(this.options.$parent);
		},
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
				height = this.options.general.height * this.options.height,
				top = coord.screenY - height,
				zindex = (mapX + mapY ) * this.options.general.layers + this.options.layerIndex;

			this.$cell.css({
				'left': coord.screenX+'px',
				//'top': coord.screenY+'px',
				'top': top+'px',
				'z-index': zindex
			});
		}
	});
}(hiswe, jQuery));