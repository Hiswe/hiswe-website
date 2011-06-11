(function(h, $){

	var worldSettings = {
		general: {
			mapX: 20,
			mapY: 20,
			layers: 3,
			width: 64, // cellWidth
			height: 32 // cellHeight
		}
	},
	world;

	h.setSettings('game.world', worldSettings);
	h.setSettings('game.layer', worldSettings);
	h.setSettings('game.groundLayer', worldSettings);
	h.setSettings('game.secondGroundLayer', worldSettings);
	h.setSettings('game.flowerLayer', worldSettings);
	h.setSettings('map.static', worldSettings);
	h.setSettings('map.coordinate', worldSettings);

	world = h.gameWorld();
	world.init();


}(hiswe, jQuery));