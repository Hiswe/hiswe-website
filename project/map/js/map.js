h.module('game.world',{
	options: {
		width: 10,
		height: 10,
		cellWidth: 64,
		cellHeight: 32,
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
		var top, left, worldWidth;
		worldWidth = this.options.width * this.options.cellWidth;
		top = (xCell * (this.options.cellHeight/2)) + (yCell * (this.options.cellHeight/2));
		left = worldWidth/2 - ((this.options.cellWidth/2)*(xCell+1)) + (yCell * (this.options.cellWidth/2));



		//h.debug('[',this.options.fullName,'] Position ::', left,'||',top);
		return {
			top: top+'px',
			left: left+'px'
		};
	}
});


h.module('map.cell',{
	options: {
		width: 64,
		height: 32,
		template: '<div class="cell" />'
	},
	_create: function () {
		// h.debug('info','[',this.options.fullName,'] Create');
	},
	build: function () {
		this.$cell = $(this.options.template)
					.width(this.options.width)
					.height(this.options.height);
		if (Math.random() > 0.9) {
			this.$cell.addClass('flower');
		}					
		//h.debug('[',this.options.fullName,'] build ::' ,this.$cell);
		return this.$cell;
	}
});


var world = h.game.world({
	width: 10,
	height: 10
});