(function(h, $){

	h.moduleSettings('game.world', {
		mapX: 10,
		mapY: 8
	});

	h.moduleSettings('map.cell', {
		width: 64,
		height: 32
	});


	h.game.world('init');

}(hiswe, jQuery));
