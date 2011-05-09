(function(h, $) {
	h.module('map.cell',{
		options: {
			template: '<div class="cell" />'
		},
		_create: function () {
		},
		_bindActions: function (x, y) {
			$.subscribe('/cursor/in/'+x+'/'+y, $.proxy(this._cursorHover, this));
			$.subscribe('/cursor/out/'+x+'/'+y, $.proxy(this._cursorOut, this));

		},
		build: function (x, y) {
			var z = 0;
			if (Math.random() > 0.95) {
				z = 0.5;
			}
			if (Math.random() > 0.97) {
				z = 1;
			}

			this.$cell = $(this.options.template)
						.width(h.settings.map.cell.width)
						.height(h.settings.map.cell.height + h.settings.map.cell.height*z)
						.attr('id', 'Cell-'+x+'-'+y);
			this.name = '[Cell-'+x+'-'+y+'-'+z+']';
			this._positionCell(x, y, z);
			if (z === 0) {
				this._bindActions(x, y);
			}

			if (z === 1) {
				this.$cell.addClass('cell100');
			}else if(z == 0.5) {
				this.$cell.addClass('cell50');
			}else if (Math.random() > 0.8){
				this.$cell.addClass('flower');
			}

			return this.$cell;
		},
		_cursorHover: function (x, y) {
			log.gameConsole('append', 'Hover ', x , y);
			this.$cell.addClass('hover');
		},
		_cursorOut : function (x, y) {
			log.gameConsole('append', 'out ', x , y);
			this.$cell.removeClass('hover');
		},
		_positionCell: function (mapX, mapY, mapZ) {
			var top,
				left,
				worldWidth = (h.settings.game.world.mapX + 1) * h.settings.map.cell.width;

			screenX = worldWidth/2 + h.settings.map.cell.width * ((mapY - mapX - 2) / 2);
			screenY = h.settings.map.cell.height * (((mapX + mapY) / 2)) - h.settings.map.cell.height* mapZ;


			this.$cell.css({
				left: screenX+'px',
				top: screenY+'px'
			})
		}
	});
})(hiswe, jQuery);