
(function( h, $ ) {
	h.object( 'map.moveable', 'map.static', {
		options: {
			speed: 1000
		},
		_action: function () {
			var that = this;
			setTimeout( function () {
				that._chooseDirection( that._action );
			}, that._moveDelay() );

		},
		_build: function () {
			this._super( '_build', arguments );
			var character = ( Math.random() > 0.5 ) ? 'flora' : 'celesta';
			this.$cell.addClass( character );
			this._action();
		},
		_chooseDirection: function ( callback ) {
			var o = this.options,
				possibleMovement = h.game.cache( 'getClosestFreeCells', [ o.layerIndex,  o.layerIndex + 1 ], o.mapX, o.mapY ),
				selectedMovement = possibleMovement[ Math.floor( Math.random() * possibleMovement.length ) ];

			// MaJ moveable cache
			h.game.cache( 'move',
			o.layerIndex, 
			{ 
				x: o.mapX, 
				y: o.mapY 
			}, {
				x: o.mapX + selectedMovement[ 0 ],
				y: o.mapY + selectedMovement[ 1 ]
			} );
			// check z-index

			// set futur coord
			o.mapX = o.mapX + selectedMovement[ 0 ];
			o.mapY = o.mapY + selectedMovement[ 1 ];
			
			this._moveToPosition( selectedMovement, callback );

		},
		_moveToPosition: function ( selectedMovement, callback ) {
			var that = this,
				o = this.options,
				coord = this._mapToScreen( o.mapX, o.mapY, o.mapZ ),
				height = this.options.general.height * o.height,
				top = coord.screenY - height,
				zindex = ( o.mapX + o.mapY ) * this.options.general.layers + o.layerIndex,
				callback = callback || $.noop,
				// deplacement matrix is the 8 possible displacement and when the z-index should be updated
				// the +layer data is if in a diagonal movment the sprite is overlaping a higher sprite
				deplacementMatrice = [ 
					[ 'after', 'after', 'before+layer'],
					[ 'after', 'none', 'before'],
					[ 'before+layer', 'before', 'before']
				],
				zIndexChangement = function () {
					return deplacementMatrice[ selectedMovement[ 0 ] + 1 ][ selectedMovement[ 1 ] + 1 ];
				}();

			// h.debug( '[MOVEABLE] move to z-index :', zIndexChangement);

			switch ( zIndexChangement ) {
				case 'before' :
					this.$cell.css( 'z-index', zindex );
				break;
				case 'before+layer' :
					this.$cell.css( 'z-index', zindex + this.options.general.layers );
				break; 
			}
			this.$cell
			.animate({
				'left': coord.screenX+'px',
				'top': top+'px'
			},
			o.speed,
			function () {
				if ( zIndexChangement === 'after'  || zIndexChangement === 'before+layer' ) {
					$( this ).css( 'z-index', zindex );
				}
				callback.call( that );
			});
		},
		_moveDelay: function () {
			return Math.round( Math.random() * 10000 );
		}
	});
}( hiswe, jQuery ) );