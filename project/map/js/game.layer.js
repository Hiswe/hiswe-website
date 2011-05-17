(function(h, $) {
	h.object('game.layer',{
		options: {
			$parent: $('body')
		},
		_create: function () {
			h.debug('info','[',this.options.fullName,'] Create', this.options);
			this._makeCache();
			this._buildLayer();
		},
		init: function () {
			/*
			this._setMapSize();
			this._buildMap();
			//*/
		},
		_buildLayer: function () {
			var mapWidth = h.settings.game.world.mapX,
				mapHeight = h.settings.game.world.mapY;
			//*
			for (var x = 0; x < mapWidth; x++) {
				for (var y = 0; y < mapHeight; y++) {
					h.mapStatic({
						mapX : x,
						mapY: y,
						$parent: this.$element
					});
				}
			}
			this.$element.appendTo(this.options.$parent);
			//*/
		},
		_makeCache: function () {
			this.$element = $('<div />', {
				id: this.options.fullName +'-'+ this.options.index
			});
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