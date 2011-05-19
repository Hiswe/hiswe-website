(function(h, $) {
	h.object('map.static', 'map.coordinate', {
		options: {
			template: '<div class="cell" />',
			$parent: $('body')
		},
		_create: function () {
			this._build();
		},
		_build: function (x, y) {
			var x = this.options.mapX,
				y = this.options.mapY,
				z = 0;
			this.$cell = $(this.options.template)
						.width(h.settings.map.cell.width)
						.height(h.settings.map.cell.height + h.settings.map.cell.height*z)
						.attr('id', 'Cell-'+x+'-'+y);
			this.name = '[Cell-'+x+'-'+y+'-'+z+']';
			this._positionCell(x, y, z);
			this.$cell.appendTo(this.options.$parent);
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
})(hiswe, jQuery);