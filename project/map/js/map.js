h.moduleSettings('game.world', {
	mapX: 10,
	mapY: 10
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
	}
});

h.module('game.world',{
	options: {
		id: 'world'
	},
	_create: function () {
		h.debug('info','[',this.options.fullName,'] Create');

		this._makeCache();

		this.$element
			.width(h.settings.game.world.mapX * h.settings.map.cell.width)
			.height(h.settings.game.world.mapX * h.settings.map.cell.height)
			.css({
				position: 'relative'
			});

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
	_makeCache: function () {
		this.$element = $('#'+this.options.id);
		var offset = this.$element.offset();
		this.position = {
			left: Math.round(offset.left),
			top: Math.round(offset.top)
		};
		this.cursor = {
			x: 0,
			y: 0
		}
	},
	_mapToScreen: function () {

	},
	_sceenToMap: function () {

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

		if (roundMapX > -1 && roundMapX < h.settings.game.world.mapX && roundMapY > -1 && roundMapY < h.settings.game.world.mapX) {
			$.publish('/cursor/'+roundMapX+'/'+roundMapY, [roundMapX,roundMapY]);
			log.gameConsole('log', roundMapX,'|',roundMapY);
		} else {
			//log.gameConsole('log','Out of bound !!!', mapX ,",",mapY,'||', roundMapX, roundMapY);
			log.gameConsole('log','Out of bound !!!');
		}

	}
});

h.module('map.cell',{
	options: {
		template: '<div href="" class="cell" />'
	},
	_create: function () {
		this.options.worldWidth = this.options.worldWidth * this.options.width;
	},
	_bindActions: function (x, y) {
		$.subscribe('/cursor/'+x+'/'+y, $.proxy(this._hover, this));
	},
	build: function (x, y) {
		this.$cell = $(this.options.template)
					.width(h.settings.map.cell.width)
					.height(h.settings.map.cell.height);
		this._positionCell(x, y);
		this._bindActions(x, y);
		if (Math.random() > 0.9) {
			this.$cell.addClass('flower');
		}
		//h.debug('[',this.options.fullName,'] build ::' ,this.$cell);
		return this.$cell;
	},
	_hover: function (x, y) {
		var that = this;
		this.$cell.addClass('hover');
		setTimeout(function(){
			that.$cell.removeClass('hover');
		}, 500);

	},
	_positionCell: function (xCell, yCell) {
		var top,
			left,
			worldWidth = h.settings.game.world.mapX * h.settings.map.cell.width
			width = h.settings.map.cell.width/2,
			height = h.settings.map.cell.height/2;

		// top = (xCell * (height/2)) + (yCell * (height/2));
		top = (xCell + yCell) * height;
		// left = worldWidth/2 - (width*(xCell+1)) + (yCell * width);
		left = worldWidth/2 + width * (yCell - xCell -1);

		this.$cell.css({
			top: top+'px',
			left: left+'px'
		})
	}
});

var log = h.game.console();
var world = h.game.world();