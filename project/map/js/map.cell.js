h.module('map.cell',{
	options: {
		template: '<div href="" class="cell" />'
	},
	_create: function () {
	},
	_bindActions: function (x, y) {
		// h.debug('[Cell-',x,'-',y,']');

		for (var siblingX = x-1; siblingX < x+2; siblingX += 1 ) {
			for (var siblingY = y-1; siblingY < y+2; siblingY += 1 ) {
				if (siblingX === x && siblingY === y) {
					$.subscribe('/cursor/'+x+'/'+y, $.proxy(this._cursorHover, this));
				}else if (siblingX > -2 && siblingX < h.settings.game.world.mapX +1 &&
					siblingY > -2 && siblingY < h.settings.game.world.mapY +1) {
					$.subscribe('/cursor/'+siblingX+'/'+siblingY, $.proxy(this._cursorOut, this));
				}else{
					$.subscribe('/cursor/null/null', $.proxy(this._cursorOut, this));
				}
			}

		}
	},
	build: function (x, y) {
		this.$cell = $(this.options.template)
					.width(h.settings.map.cell.width)
					.height(h.settings.map.cell.height)
					.attr('id', 'Cell-'+x+'-'+y);
		this.name = '[Cell-'+x+'-'+y+']';
		this._positionCell(x, y);
		this._bindActions(x, y);
		if (Math.random() > 0.9) {
			this.$cell.addClass('flower');
		}
		//h.debug('[',this.options.fullName,'] build ::' ,this.$cell);
		return this.$cell;
	},
	_cursorHover: function (x, y) {
		//h.debug(this.name,' hover', x,'/',y);
		log.gameConsole('append', 'Hover ', x , y);
		this.$cell.addClass('hover');
	},
	_cursorOut : function (x, y) {
		//h.debug(this.name,' out', x,'/',y);
		log.gameConsole('append', 'out ', x , y);
		this.$cell.removeClass('hover');
	},
	_positionCell: function (mapX, mapY) {
		var top,
			left,
			worldWidth = (h.settings.game.world.mapX + 1) * h.settings.map.cell.width;

		screenX = worldWidth/2 + h.settings.map.cell.width * ((mapY - mapX) / 2);
		screenY =  h.settings.map.cell.height * (((mapX + mapY) / 2) + 1);


		this.$cell.css({
			left: screenX+'px',
			top: screenY+'px'
		})
	}
});