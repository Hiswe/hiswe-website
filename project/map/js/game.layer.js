(function(h, $) {
	h.object('game.layer',{
		options: {
			$parent: $('body')
		},
		_create: function () {
			h.debug('info','[',this.options.fullName,'] Create', this.options);
			this._makeCache();
			this.build(this.options.index);
			this.showLayer();
			// this._bindActions();
		},
		init: function () {
			/*
			this._setMapSize();
			this._buildMap();
			//*/
		},
		_bindActions: function () {

		},
		build: function (layerIndex) {
			for (var x = 0; x < this.mapWidth; x++) {
				for (var y = 0; y < this.mapHeight; y++) {
					this.buildCell({
						x: x,
						y: y,
						z: 0,
						layerIndex: layerIndex,
						$parent: this.$element
					})
				}
			}
		},
		buildCell: function (data) {
			h.mapStatic({
				mapX : data.x,
				mapY: data.y,
				layerIndex: data.layerIndex,
				$parent: this.$element
			});
		},
		getCell: function (x, y) {
			return 'caca';
		},
		_makeCache: function () {
			this.$element = $('<div />', {
				id: this.options.fullName +'-'+ this.options.index
			});
			this.mapWidth = h.settings.game.world.mapX;
			this.mapHeight = h.settings.game.world.mapY;
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
		},
		showLayer: function () {
			this.$element.prependTo(this.options.$parent);
		}
	});
}(hiswe, jQuery));