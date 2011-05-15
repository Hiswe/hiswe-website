(function (h, $) {
	h.object('map.coordinate', {
		_mapToScreen: function (mapX, mapY, mapZ) {
			var worldWidth = (h.settings.game.world.mapX + 1) * h.settings.map.cell.width;

			screenX = worldWidth/2 + h.settings.map.cell.width * ((mapY - mapX - 2) / 2);
			screenY = h.settings.map.cell.height * (((mapX + mapY) / 2)) - h.settings.map.cell.height* mapZ;

			return {
				screenX: screenX,
				screenY: screenY
			};
		},
		_screenToMap: function (screenX, screenY) {
			var mapX,
				mapY,
				roundMapX,
				roundMapY,
				worldWidth = h.settings.game.world.mapX * h.settings.map.cell.width / 2,
				width = h.settings.map.cell.width/2,
				height = h.settings.map.cell.height/2;;

			mapX = ((worldWidth - screenX)/width + screenY/height - 1)/2;
			mapY = screenY/height - mapX -1;
			roundMapX = Math.round(mapX);
			roundMapY = Math.round(mapY);

			return {
				mapX: roundMapX,
				mapY: roundMapY
			};
		}

	});
}(hiswe, jQuery));