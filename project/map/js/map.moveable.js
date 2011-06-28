
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
				newMapX,
				newMapY,
				xMove = 0,
				yMove = 0;


			switch ( Math.random() > 0.5 ) {
				case true: // vertical move
					yMove = ( Math.random() > 0.5 ) ? 1 : -1;
				break;
				case false: // horizontal move
					xMove = ( Math.random() > 0.5 ) ? 1 : -1;
				break;
			}
			// TODO : check if it is a non occupied cell
			// ...
			newMapX = o.mapX + xMove;
			newMapY = o.mapY + yMove;
			// MaJ moveable cache
			o.mapX = newMapX;
			o.mapY = newMapY;
			// TODO : MAJ map.cache
			// ...
			this._moveToPosition( newMapX, newMapY, o.mapZ, callback );

		},
		_moveToPosition: function ( mapX, mapY, mapZ, callback ) {
			h.debug('[MOVEABLE] move to :', mapX, mapY);
			var that = this,
				coord = this._mapToScreen( mapX, mapY, mapZ ),
				height = this.options.general.height * this.options.height,
				top = coord.screenY - height,
				zindex = ( mapX + mapY ) * this.options.general.layers + this.options.layerIndex,
				callback = callback || $.noop;

			// TODO : change z-index only if futureX < actualX
			// ...
			this.$cell
			.css( 'z-index', zindex + 2 )
			.animate({
				'left': coord.screenX+'px',
				'top': top+'px'
			},
			this.options.speed,
			function () {
				$( this ).css( 'z-index', zindex );
				callback.call( that );
			});
		},
		_moveDelay: function () {
			return Math.round( Math.random() * 10000 );
		}
	});
}( hiswe, jQuery ) );