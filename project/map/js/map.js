h.moduleSettings('game.world', {
	mapX: 10,
	mapY: 4
});
h.moduleSettings('map.cell', {
	width: 64,
	height: 32
});


h.module('game.console', {
	_create: function () {
		this.$console = $('<div />', {
			class: 'console'
		});
		this.$console.appendTo($('body'));
	},
	log: function () {
		var text = $.makeArray(arguments).join(' ');
		this.$console.text(text);
	},
	append: function () {
		var text = this.$console.html() +'<br />' +$.makeArray(arguments).join(' ');
		this.$console.html(text);
	}
});

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

		cursorX = event.pageX - this.position.left;
		cursorY = event.pageY - this.position.top;

		mapX = ((worldWidth - cursorX)/width + cursorY/height - 1)/2;
		mapY = cursorY/height - mapX -1;
		roundMapX = Math.round(mapX);
		roundMapY = Math.round(mapY);

		this._publishMove(roundMapX, roundMapY);

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
		if (x > -2 && x < h.settings.game.world.mapX +1 && y > -2 && y < h.settings.game.world.mapY + 1) {
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
		var mapWidth = ( h.settings.game.world.mapX + h.settings.game.world.mapY ) * h.settings.map.cell.width / 2,
			mapHeight = ( h.settings.game.world.mapX + h.settings.game.world.mapY ) * h.settings.map.cell.height / 2;

		this.$element
			.width(mapWidth)
			.height(mapHeight)
			.css({
				position: 'relative'
			});
	}
});

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
					.height(h.settings.map.cell.height);
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
	_positionCell: function (xCell, yCell) {
		var top,
			left,
			worldWidth = h.settings.game.world.mapX * h.settings.map.cell.width
			width = h.settings.map.cell.width/2,
			height = h.settings.map.cell.height/2;

		top = (xCell + yCell) * height;
		left = worldWidth/2 + width * (yCell - xCell -1);

		this.$cell.css({
			top: top+'px',
			left: left+'px'
		})
	}
});

var log = h.game.console();
var world = h.game.world();