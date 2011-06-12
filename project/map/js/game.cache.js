(function(h, $) {
	h.module('game.cache',{
		_create: function () {
			h.debug('info', '['+this.options.fullName+'] Create');
			this.cache = [];
		},
		get: function (layer, x, y) {
			if (this.cache[layer] && this.cache[layer][x] && this.cache[layer][x][y]) {
				return this.cache[layer][x][y];
			} else {
				h.debug('['+this.options.fullName+'] No element at position ', layer, x, y);
				return null;
			}

		},
		set: function (layer, x, y, element) {
			this.cache[layer] = this.cache[layer] || [];
			this.cache[layer][x] = this.cache[layer][x] || [];
			this.cache[layer][x][y] = element;
		}
	});
}(hiswe, jQuery));