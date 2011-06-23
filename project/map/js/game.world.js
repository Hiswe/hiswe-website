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
			this._buildLayers(1, 'gameBorderLayer');
			this._buildLayers(2, 'gameFlowerLayer');
		},
		_createCustomLayers: function () {
			// Layer 0
			h.object('game.groundLayer','game.layer',{
				buildCell: function (data) {
					return h.mapStatic({
						template: '<div class="cell" />',
						mapX : data.x,
						mapY: data.y,
						height: 0,
						layerIndex: data.layerIndex,
						$parent: this.$element
					});
				}
			});
			// BorderLayer
			h.object('game.borderLayer','game.layer',{
				buildCell: function ( data ) {
					if ( data.x === 0 || data.x === this.options.general.mapX -1 || data.y === 0 || data.y === this.options.general.mapY -1 ) {
						return h.mapStatic({
							template: '<div class="cell cell50" />',
							mapX : data.x,
							mapY: data.y,
							mapZ : this._getUnderCellHeight(data.x, data.y),
							height: 0.5,
							layerIndex: data.layerIndex,
							$parent: this.$element
						});
					}
				},
				_getUnderCellHeight: function ( x, y ) {
					return h.game.cache('getUpperZ', 0, x, y);
				}
			});
			// player layer
			h.object('game.flowerLayer','game.layer',{
				buildCell: function (data) {
					var underCellHeight = this._getUnderCellHeight( data.x, data.y );
					if ( underCellHeight === 0 &&  Math.random() > 0.7 ) {
						var flowerType = (Math.random() > 0.5) ? 'whiteFlower' : 'blueFlower';
						return h.mapStatic({
							template: '<div class="cell '+flowerType+'" />',
							mapX : data.x,
							mapY: data.y,
							mapZ : underCellHeight,
							layerIndex: data.layerIndex,
							$parent: this.$element
						});
					}
				},
				_getUnderCellHeight: function ( x, y ) {
					return h.game.cache('getUpperZ', 1, x, y);
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