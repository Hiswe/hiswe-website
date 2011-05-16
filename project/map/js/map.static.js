(function(h, $) {
	h.object('map.static', 'map.coordinate', {
		options: {
			template: '<div class="cell" />',
			parent: $(body)
		},
		_create: function (x, y) {
			this._build(x,y);
		},
		_build: function (x, y) {
			var z = 0;
			this.$cell = $(this.options.template)
						.width(h.settings.map.cell.width)
						.height(h.settings.map.cell.height + h.settings.map.cell.height*z)
						.attr('id', 'Cell-'+x+'-'+y);
			this.name = '[Cell-'+x+'-'+y+'-'+z+']';
			this._positionCell(x, y, z);
		},
		_positionCell: function (mapX, mapY, mapZ) {
			var coord = this._mapToScreen(mapX, mapY, mapZ);

			this.$cell.css({
				left: coord.screenX+'px',
				top: coord.screenY+'px'
			});
		}
	});
})(hiswe, jQuery);