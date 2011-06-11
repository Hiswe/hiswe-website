(function (h, $) {
	h.object('map.coordinate', {
		_mapToScreen: function (mapX, mapY, mapZ) {
			var worldWidth = (this.options.general.mapX + 1) * this.options.general.width;

			screenX = worldWidth/2 + this.options.general.width * ((mapY - mapX - 2) / 2);
			screenY = this.options.general.height * (((mapX + mapY) / 2)) - this.options.general.height* mapZ;

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
				worldWidth = this.options.general.mapX * this.options.general.width / 2,
				width = this.options.general.width/2,
				height = this.options.general.height/2;;

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