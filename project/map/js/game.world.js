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
			this._buildLayers(0, 'gameGroundLayer');
			this._buildLayers(1, 'gameFlowerLayer');
		},
		_createCustomLayers: function () {
			h.object('game.flowerLayer','game.layer',{
				buildCell: function (data) {
					if (Math.random() > 0.5) {
						//h.debug(h.game.world('getLayer', 0).gameGroundLayer('getCell'));
						var flowerType = (Math.random() > 0.25) ? 'whiteFlower' : 'blueFlower';
						h.mapStatic({
							template: '<div class="cell '+flowerType+'" />',
							mapX : data.x,
							mapY: data.y,
							layerIndex: data.layerIndex,
							$parent: this.$element
						});
					}
				}
			});
			h.object('game.groundLayer','game.layer',{
				buildCell: function (data) {
					var z = (Math.random() > 0.95) ? 0.5 :
							(Math.random() > 0.97) ? 1 :
							0,
						zClass = (z === 1) ? ' cell100' :
								(z == 0.5) ? ' cell50' :
								'';

					h.mapStatic({
						template: '<div class="cell'+zClass+'" />',
						mapX : data.x,
						mapY: data.y,
						mapZ: z,
						layerIndex: data.layerIndex,
						$parent: this.$element
					});
				}
			});

		},
		getLayer: function (index) {
			return this.layers[index];
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