(function(h, $) {
	h.object('game.world',{
		options: {
			id: 'world'
		},
		_create: function () {
			h.debug('info','['+this.options.fullName+'] Create');
			h.debug('['+this.options.fullName+'] Options ::', this.options);
			this._makeCache();
			this._createCustomLayers();
		},
		init: function () {
			this._setMapSize();
			this._buildMap();
		},
		_buildLayers: function (layerIndex, layerType) {
			h.debug('['+this.options.fullName+'] Build layer ::', layerType);
			layerType = layerType || 'gameLayer';
			h[layerType]({
				index: layerIndex,
				$parent: this.$element
			});
		},
		_buildMap: function () {
			this._buildLayers(0, 'gameGroundLayer');
			this._buildLayers(1, 'gameSecondGroundLayer');
			this._buildLayers(2, 'gameFlowerLayer');
		},
		_createCustomLayers: function () {
			// Layer 0
			h.object('game.groundLayer','game.layer',{
				buildCell: function (data) {
					var height = (Math.random() > 0.5) ? 0.5 :
							(Math.random() > 0.5) ? 1 :
							0,
						zClass = (height === 1) ? ' cell100' :
								(height == 0.5) ? ' cell50' :
								'';

					return h.mapStatic({
						template: '<div class="cell'+zClass+'" />',
						mapX : data.x,
						mapY: data.y,
						height: height,
						layerIndex: data.layerIndex,
						$parent: this.$element
					});
				}
			});
			// Layer 1
			h.object('game.secondGroundLayer','game.layer',{
				buildCell: function (data) {
					var height = (Math.random() > 0.2) ? 0.5 :
							(Math.random() > 0.99) ? 1 :
							0,
						zClass = (height === 1) ? ' cell100' :
								(height == 0.5) ? ' cell50' :
								'';

					return h.mapStatic({
						template: '<div class="cell'+zClass+'" />',
						mapX : data.x,
						mapY: data.y,
						mapZ : this._getUnderCellHeight(data.x, data.y),
						height: height,
						layerIndex: data.layerIndex,
						$parent: this.$element
					});
				},
				_getUnderCellHeight: function (x, y) {
					return h.game.cache('get', 0, x, y).getUpperZ();
				}
			});
			// Layer 2
			h.object('game.flowerLayer','game.layer',{
				buildCell: function (data) {
					if (Math.random() > 0.2) {
						var flowerType = (Math.random() > 0.5) ? 'whiteFlower' : 'blueFlower';
						return h.mapStatic({
							template: '<div class="cell '+flowerType+'" />',
							mapX : data.x,
							mapY: data.y,
							mapZ : this._getUnderCellHeight(data.x, data.y),
							layerIndex: data.layerIndex,
							$parent: this.$element
						});
					}
				},
				_getUnderCellHeight: function (x, y) {
					return h.game.cache('get', 1, x, y).getUpperZ();
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
			this.worldWidth = (this.options.general.mapX + this.options.general.mapY) * this.options.general.width / 2,
			this.worldHeight = (this.options.general.mapX + this.options.general.mapY) * this.options.general.height / 2;

			this.$element
				.width(this.worldWidth)
				.height(this.worldHeight)
				.css({
					position: 'relative'
				});
		}
	});
}(hiswe, jQuery));