
(function(h, $) {
	h.object( 'map.moveable', 'map.static',{
		_bindActions: function () {

		},
		_build: function () {
			this._super( '_build', arguments );
			var character = ( Math.random() > 0.5 ) ? 'flora' : 'celesta';
			this.$cell.addClass( character );
		}

	});
}(hiswe, jQuery));