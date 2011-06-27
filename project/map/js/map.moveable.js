
(function( h, $ ) {
	h.object( 'map.moveable', 'map.static', {
		options: {
			speed: 1000
		},
		_create: function () {
			this._super( '_create', arguments );
			this.directions = [ 'top', 'right', 'bottom', 'left' ];
		},
		_action: function () {
			var that = this;
			setTimeout( function () {
				that._move( that._randomDirection(), that._action )
			}, that._moveDelay() );

		},
		_build: function () {
			this._super( '_build', arguments );
			var character = ( Math.random() > 0.5 ) ? 'flora' : 'celesta';
			this.$cell.addClass( character );
			this._action();
		},
		_move: function ( direction, callback ) {
			var that = this,
				otherMove = $.map( this.directions, function ( value , index) {
					return ( value != direction ) ? value : null;
				});

			//  h.debug( otherMove );
			switch ( direction ) {
				case 'top':
					this.$cell.animate({
						top: '+='  + this.options.general.height / 2,
						left: '+=' + this.options.general.width / 2
					},
					this.options.speed,
					function () {
						callback.call( that );
					});
				break;
				case 'right':
					this.$cell.animate({
						top: '-='  + this.options.general.height / 2,
						left: '+=' + this.options.general.width / 2
					},
					this.options.speed,
					function () {
						callback.call( that );
					});
				break;
				case 'bottom':
					this.$cell.animate({
						top: '-='  + this.options.general.height / 2,
						left: '-=' + this.options.general.width / 2
					},
					this.options.speed,
					function () {
						callback.call( that );
					});
				break;
				case 'left':
					this.$cell.animate({
						top: '-='  + this.options.general.height / 2,
						left: '-=' + this.options.general.width / 2
					},
					this.options.speed,
					function () {
						callback.call( that );
					});
				break;
				default:
					h.debug( direction );
			}
		},
		_moveDelay: function () {
			return Math.round( Math.random() * 10000 );
		},
		_randomDirection: function () {
			return this.directions[ Math.floor( Math.random() * this.directions.length ) ];

		}
	});
}( hiswe, jQuery ) );