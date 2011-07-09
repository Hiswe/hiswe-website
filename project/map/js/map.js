(function(h, $){

	var worldSettings = {
		general: {
			mapX: 28,
			mapY: 20,
			layers: 4,
			width: 64, // cellWidth
			height: 32 // cellHeight
		}
	},
	world;

	h.setSettings('game.world', worldSettings);
	h.setSettings('game.layer', worldSettings);
	h.setSettings('game.groundLayer', worldSettings);
	h.setSettings('game.borderLayer', worldSettings);
	h.setSettings('game.flowerLayer', worldSettings);
	h.setSettings('game.playerLayer', worldSettings);
	h.setSettings('map.static', worldSettings);
	h.setSettings('map.moveable', worldSettings);
	h.setSettings('map.coordinate', worldSettings);

	world = h.gameWorld();
	world.init();
	scroll = h.gameScroll();
	scroll.init(); 

}(hiswe, jQuery));