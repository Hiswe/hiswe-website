(function(h, $) {
	h.module('game.world',{
		options: {
			id: 'world'
		},
		_create: function () {
			h.debug('info','[',this.options.fullName,'] Create');
			this._makeCache();
			this._createCustomLayers();
		},
		init: function () {
			this._setMapSize();
			this._buildMap();
		},
		_buildLayers: function (layerIndex, layerType) {
			this.layers = this.layers || [] ;
			layerType = layerType || 'gameLayer';
			this.layers.push(h[layerType]({
				index: layerIndex,
				$parent: this.$element
			}));
		},
		_buildMap: function () {
			this._buildLayers(1);
			this._buildLayers(2, 'gameFlowerLayer');
		},
		_createCustomLayers: function () {
			h.object('game.flowerLayer','game.layer',{
				build: function (layerIndex) {
					for (var x = 0; x < this.mapWidth; x++) {
						for (var y = 0; y < this.mapHeight; y++) {
							if (Math.random() > 0.9) {
								var flowerType = (Math.random() > 0.25) ? 'whiteFlower' : 'blueFlower';
								h.mapStatic({
									template: '<div class="cell '+flowerType+'" />',
									mapX : x,
									mapY: y,
									layerIndex: layerIndex,
									$parent: this.$element
								});
							}
						}
					}
				}
			});

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