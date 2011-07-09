(function(h, $) {
	h.module('game.cache',{
		_create: function () {
			h.debug('info', '['+this.options.fullName+'] Create');
			this.cache = [];
		},
		suppress: function ( layer, x, y ) {
			// h.debug( '[CACHE] suppress', layer, x, y );
			delete this.cache[ layer ][ x ][ y ];
		},
		get: function ( layer, x, y ) {
			if (this.cache[layer] && this.cache[layer][x] && this.cache[layer][x][y]) {
				return this.cache[layer][x][y];
			} else {
				// h.debug('['+this.options.fullName+'] No element at position ', layer, x, y );
				return false;
			}
		},
		getClosestFreeCells: function ( layer, x, y ) {
			var i,
				j,
				k,
				freeCells = [],
				layerMiningResult,
				layerMiningLength;
			for ( i = -1; i < 2; i++ ) {
				for ( j = -1; j < 2; j++ ) {
					if ( !(i === 0 && j === 0 ) ) { // dont't look on the same cell
						if ( $.isArray( layer ) ) { // look on multiple layers
							layerMiningResult = true;
							layerMiningLength = layer.length
							for ( k = 0; k < layerMiningLength; k++ ) {
								if ( this.get( layer[ k ], x + i, y + j ) !== false ) {
									layerMiningResult = false;
									break;
								}
							}
							if ( layerMiningResult === true ) {
								freeCells.push( [ i, j ] );
							}
						} else {
							if ( !this.get( layer, x + i, y + j ) ) {
								freeCells.push( [ i, j ] );
							}						
						}
					}
				}
			}
			return freeCells;
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
		move: function ( layer, position1, position2 ) {
			var element = this.get( layer, position1.x, position1.y );
			if ( element === false ) {
				h.debug( 'warn', '[CACHE] move :: no element at position :', layer, position1.x, position1.y );
			}
			// h.debug( '[CACHE] set', layer, x, y );
			this.set( layer, position2.x, position2.y, element );
			this.suppress( layer, position1.x, position1.y );
		},
		set: function (layer, x, y, element) {
			this.cache[ layer ] = this.cache[ layer ] || [];
			this.cache[ layer ][ x ] = this.cache[ layer ][ x ] || [];
			this.cache[ layer ][ x ][ y ] = element;
			
		}
	});
}(hiswe, jQuery));