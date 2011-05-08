h.module('game.world',{
	options: {
		id: 'world'
	},
	_create: function () {
		h.debug('info','[',this.options.fullName,'] Create');
		this._makeCache();
		this._setMapSize();
		this._bindActions();
		this._buildMap();
	},
	_bindActions: function () {
		this.$element.bind('mousemove.'+this.options.fullName, $.proxy(this._cursorMove, this));
		this.$element.bind('mouseleave.'+this.options.fullName, $.proxy(this._cursorOut, this));
	},
	_buildMap: function () {
		var mapWidth = h.settings.game.world.mapX,
			mapHeight = h.settings.game.world.mapY;

		for (var x = 0; x < mapWidth; x++) {
			for (var y = 0; y < mapHeight; y++) {
				var currentCell = h.map.cell();
				this.$element.append(currentCell.mapCell('build', x, y));
			}
		}
	},
	_cursorMove: function (event) {
       var cursorX, cursorY, top, left, mapX, mapY, roundMapX, roundMapY,
               worldWidth = h.settings.game.world.mapX * h.settings.map.cell.width / 2,
               width = h.settings.map.cell.width/2,
               height = h.settings.map.cell.height/2;;

       screenX = event.pageX - this.position.left;
       screenY = event.pageY - this.position.top;

       // TODO: Virer le padding. Faire une mouseleave pour les 4 cellules de coins

       mapX = ((worldWidth - screenX)/width + screenY/height - 1)/2;
       mapY = screenY/height - mapX -1;
       roundMapX = Math.round(mapX);
       roundMapY = Math.round(mapY);

		this._publishMove(roundMapX, roundMapY);
	},
	_cursorOut: function () {
		log.gameConsole('append','Out');
		$.publish('/cursor/out');
	},
	_makeCache: function () {
		this.$element = $('#'+this.options.id);
		var offset = this.$element.offset();
		this.position = {
			left: Math.round(offset.left),
			top: Math.round(offset.top)
		};
		this.oldPos = {
			x: null,
			y: null
		}
	},
	_publishMove: function (x, y) {
		if (x === this.oldPos.x && y === this.oldPos.y) {
			return;
		}
		// TODO: faire une fonction globale pour savoir si une coordonnée est bien dans la map.
		if (x > -2 && x < h.settings.game.world.mapX +1 && y > -2 && y < h.settings.game.world.mapY +1) {
			this.oldPos = {
				x: x,
				y: y
			};
			log.gameConsole('log', x,'|',y);
		} else {
			this.oldPos = {
				x: null,
				y: null
			};
			log.gameConsole('log','Out of bound !!!');
		}
		$.publish('/cursor/'+this.oldPos.x+'/'+this.oldPos.y, [this.oldPos.x,this.oldPos.y]);

	},
	_setMapSize: function () {
		this.worldWidth = (h.settings.game.world.mapX + h.settings.game.world.mapY) * h.settings.map.cell.width / 2,
		this.worldHeight = (h.settings.game.world.mapX + h.settings.game.world.mapY) * h.settings.map.cell.height / 2;

		// TODO: Virer le padding. Faire une mouseleave pour les 4 cellules de coins
		this.$element
			.width(this.worldWidth)
			.height(this.worldHeight)
			.css({
				position: 'relative'
			});
	}
});