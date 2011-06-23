(function(h, $) {
	h.module('game.cache',{
		_create: function () {
			h.debug('info', '['+this.options.fullName+'] Create');
			this.cache = [];
		},
		get: function ( layer, x, y ) {
			if (this.cache[layer] && this.cache[layer][x] && this.cache[layer][x][y]) {
				return this.cache[layer][x][y];
			} else {
				h.debug('['+this.options.fullName+'] No element at position ', layer, x, y );
				return {};
			}

		},
		getUpperZ: function ( layer, x, y ) {
			var cell = false;
			for ( var layerIndex = layer ; layerIndex > -1 ; layerIndex -= 1  ) {
				if (this.cache[layerIndex] && this.cache[layerIndex][x] && this.cache[layerIndex][x][y] ) {
					cell = this.cache[layerIndex][x][y];
					break;
				}
			}

			return cell ? cell.getUpperZ() : 0;
		},
		set: function (layer, x, y, element) {
			this.cache[layer] = this.cache[layer] || [];
			this.cache[layer][x] = this.cache[layer][x] || [];
			this.cache[layer][x][y] = element;
		}
	});
}(hiswe, jQuery));