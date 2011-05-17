(function(h, $){

	h.moduleSettings('game.world', {
		mapX: 10,
		mapY: 8
	});

	h.moduleSettings('map.cell', {
		width: 64,
		height: 32
	});

	h.object('map.sprite', 'map.coordinate', {
		_create: function () {
			h.debug('[Sprite] create');
		}
	});

	h.object('map.layer', {
		_create: function () {

		}
	});

	var cursor = h.mapCoordinate();

	h.game.world('init');

}(hiswe, jQuery));
