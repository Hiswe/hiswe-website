(function(h, $){

	h.moduleSettings('game.world', {
		mapX: 20,
		mapY: 20,
		layers: 3
	});

	h.moduleSettings('map.cell', {
		width: 64,
		height: 32
	});

	h.debug('time', 'map');
	h.game.world('init');
	h.debug('timeEnd', 'map');

}(hiswe, jQuery));
