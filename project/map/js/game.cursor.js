(function(h, $) {
	h.module('game.cursor',{
		_create: function () {
			h.debug('info','[',this.options.fullName,'] Create');
			this._makeCache();
			this._bindActions();
		},
		_bindActions: function () {
			this.$element.bind('mousemove.'+this.options.fullName, $.proxy(this._cursorMove, this));
			this.$element.bind('mouseleave.'+this.options.fullName, $.proxy(this._cursorOut, this));
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
			$.publish('/cursor/out/'+this.oldPos.x+'/'+this.oldPos.y, [this.oldPos.x,this.oldPos.y]);
			this.oldPos = {
				x: null,
				y: null
			};
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
			$.publish('/cursor/out/'+this.oldPos.x+'/'+this.oldPos.y, [this.oldPos.x,this.oldPos.y]);
			// TODO: faire une fonction globale pour savoir si une coordonnée est bien dans la map.
			if (x > -1 && x < h.settings.game.world.mapX  && y > -1 && y < h.settings.game.world.mapY) {

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
			$.publish('/cursor/in/'+this.oldPos.x+'/'+this.oldPos.y, [this.oldPos.x,this.oldPos.y]);

		}
	});
}(hiswe, jQuery));