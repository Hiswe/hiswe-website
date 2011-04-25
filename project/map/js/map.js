h.module('game.world',{
	options: {
		width: 10,
		height: 10,
		cellWidth: 64,
		cellHeight: 33,
		id: 'world'
	},
	_create: function () {
		h.debug('info','[',this.options.fullName,'] Create');


		this.$element = $('#'+this.options.id).css({
			position: 'relative'
		});



		this.world = world = [];
		for (var i = 0; i < this.options.width; i++) {
			world.push([]);
			for (var j = 0; j < this.options.height; j++) {
				var currentCell = h.map.cell();
				world[i].push(currentCell);
				this.$element.append(currentCell.mapCell('build').css(this._positionCell(i,j)));

			}
		}
		h.debug('table', world);
	},
	_positionCell: function(xCell, yCell) {
		var top, left;
		top = xCell/2 * this.options.cellHeight;
		left = (xCell % 2 == 0)  ? yCell * this.options.cellWidth - this.options.cellWidth/2: yCell * this.options.cellWidth;



		h.debug('[',this.options.fullName,'] Position ::', left,'||',top);
		return {
			top: top+'px',
			left: left+'px'
		};
	}
});


h.module('map.cell',{
	options: {
		width: 64,
		height: 33,
		template: '<div class="cell" />'
	},
	_create: function () {
		// h.debug('info','[',this.options.fullName,'] Create');
	},
	build: function () {
		this.$cell = $(this.options.template)
					.width(this.options.width)
					.height(this.options.height);
		h.debug('[',this.options.fullName,'] build ::' ,this.$cell);
		return this.$cell;
	}
});


var world = h.game.world({
	width: 3,
	height: 3
});