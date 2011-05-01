h.moduleSettings('game.world', {
	mapX: 10,
	mapY: 10
});

h.moduleSettings('map.cell', {
	width: 64,
	height: 32
});

h.module('game.world',{
	options: {
		id: 'world'
	},
	_create: function () {
		var mapWidth = h.settings.game.world.mapX,
			mapHeight = h.settings.game.world.mapY;

		h.debug('info','[',this.options.fullName,'] Create');

		this.$element = $('#'+this.options.id).css({
			position: 'relative'
		});

		for (var x = 0; x < mapWidth; x++) {
			for (var y = 0; y < mapHeight; y++) {
				var currentCell = h.map.cell();
				this.$element.append(currentCell.mapCell('build', x, y));
			}
		}
		// h.debug('table', world);
	}
});


h.module('map.cell',{
	options: {
		template: '<div href="" class="cell" />'
	},
	_create: function () {
		this.options.worldWidth = this.options.worldWidth * this.options.width;
	},
	build: function (x, y) {
		this.$cell = $(this.options.template)
					.width(h.settings.map.cell.width)
					.height(h.settings.map.cell.height);
		this._positionCell(x, y);
		if (Math.random() > 0.9) {
			this.$cell.addClass('flower');
		}
		//h.debug('[',this.options.fullName,'] build ::' ,this.$cell);
		return this.$cell;
	},
	_positionCell: function (xCell, yCell) {
		var top,
			left,
			worldWidth = h.settings.game.world.mapX * h.settings.map.cell.width
			width = h.settings.map.cell.width,
			height = h.settings.map.cell.height;

		top = (xCell * (height/2)) + (yCell * (height/2));
		left = worldWidth/2 - ((width/2)*(xCell+1)) + (yCell * (width/2));

		this.$cell.css({
			top: top+'px',
			left: left+'px'
		})
	}
});


var world = h.game.world();