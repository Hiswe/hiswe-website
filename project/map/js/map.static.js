(function(h, $) {
	h.object('map.static', 'map.coordinate', {
		options: {
			mapX: 0,
			mapY: 0,
			mapZ: 0,
			template: '<div class="cell" />',
			layerIndex: 0,
			$parent: $('body')
		},
		_create: function () {
			this.name =
			this._build();
			this._bindActions();
		},
		_bindActions: function () {

		},
		_build: function () {
			var x = this.options.mapX,
				y = this.options.mapY,
				z = this.options.mapZ;
			this.name = '[L'+this.options.layerIndex+'-Cell-'+x+'-'+y+'-'+z+']';
			this.$cell = $(this.options.template)
						.width(h.settings.map.cell.width)
						.height(h.settings.map.cell.height + h.settings.map.cell.height*z)
						.attr('id', this.name);

			this._positionCell(x, y, z);
			this.$cell.appendTo(this.options.$parent);
		},
		_get: function () {

		},
		_positionCell: function (mapX, mapY, mapZ) {
			var coord = this._mapToScreen(mapX, mapY, mapZ),
				zindex = mapX+mapY + this.options.layerIndex;

			this.$cell.css({
				'left': coord.screenX+'px',
				'top': coord.screenY+'px',
				'z-index': zindex
			});
		}
	});
}(hiswe, jQuery));