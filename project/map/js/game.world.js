(function(h, $) {
	h.module('game.world',{
		options: {
			id: 'world'
		},
		_create: function () {
			h.debug('info','[',this.options.fullName,'] Create');
			this._makeCache();
		},
		init: function () {
			this._setMapSize();
			this._buildMap();
		},
		_buildLayer: function () {

		},
		_buildMap: function () {
			var mapWidth = h.settings.game.world.mapX,
				mapHeight = h.settings.game.world.mapY;

			for (var x = 0; x < mapWidth; x++) {
				for (var y = 0; y < mapHeight; y++) {
					var currentCell = h.mapStatic({
						mapX : x,
						mapY: y
					});
				}
			}
		},
		_makeCache: function () {
			this.$element = $('#'+this.options.id);
		},
		_setMapSize: function () {
			this.worldWidth = (h.settings.game.world.mapX + h.settings.game.world.mapY) * h.settings.map.cell.width / 2,
			this.worldHeight = (h.settings.game.world.mapX + h.settings.game.world.mapY) * h.settings.map.cell.height / 2;

			this.$element
				.width(this.worldWidth)
				.height(this.worldHeight)
				.css({
					position: 'relative'
				});
		}
	});
}(hiswe, jQuery));