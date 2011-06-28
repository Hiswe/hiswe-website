
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
				possibleMovement = h.game.cache( 'getClosestFreeCells', this.options.layerIndex - 2, o.mapX, o.mapY ),
				selectedMovement = possibleMovement[ Math.floor( Math.random() * possibleMovement.length ) ];


			// TODO : check if it is a non occupied cell
			// ...
			o.mapX = o.mapX + selectedMovement[ 0 ];
			o.mapY = o.mapY + selectedMovement[ 1 ];
			// MaJ moveable cache
			// TODO : MAJ map.cache
			// ...
			this._moveToPosition( callback );

		},
		_moveToPosition: function ( callback ) {
			// h.debug('[MOVEABLE] move to :', mapX, mapY);
			var that = this,
				o = this.options,
				coord = this._mapToScreen( o.mapX, o.mapY, o.mapZ ),
				height = this.options.general.height * this.options.height,
				top = coord.screenY - height,
				zindex = ( o.mapX + o.mapY ) * this.options.general.layers + this.options.layerIndex,
				callback = callback || $.noop;

			this.$cell
			.css( 'z-index', zindex + 6 )
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