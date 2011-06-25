
(function( h, $ ) {
	h.object( 'map.moveable', 'map.static', {
		_build: function () {
			this._super( '_build', arguments );
			var character = ( Math.random() > 0.5 ) ? 'flora' : 'celesta';
			this.$cell.addClass( character );
			var time = this._moveDelay();
			setTimeout( $.proxy( this._move, this ), time );
		},
		_move: function () {
			var that = this;
			this.$cell.animate({
				left: '+='+this.options.general.width
			},
			5000,
			function () {
				setTimeout( $.proxy( that._move, that ), that._moveDelay() );
			});
		},
		_moveDelay: function () {
			return Math.round( Math.random() * 10000 );
		}
	});
}( hiswe, jQuery ) );