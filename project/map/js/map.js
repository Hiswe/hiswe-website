h.module('game.world',{
	options: {
		width: 10,
		height: 10,
		id: 'world'
	},
	_create: function () {
		h.debug('info','[',this.options.fullName,'] Create');


		this.$element = $('#'+this.options.id).css({
			position: 'relative'
		});



		this.world = world = [];
		for (var x = 0; x < this.options.width; x++) {
			world.push([]);
			for (var y = 0; y < this.options.height; y++) {
				var currentCell = h.map.cell({
					worldWidth: this.options.width,
					worldHeight: this.options.height
				});
				world[x].push(currentCell);
				this.$element.append(currentCell.mapCell('build', x, y));
			}
		}
		// h.debug('table', world);
	}
});


h.module('map.cell',{
	options: {
		width: 64,
		height: 32,
		template: '<div href="" class="cell" />'
	},
	_create: function () {
		this.options.worldWidth = this.options.worldWidth * this.options.width;
	},
	build: function (x, y) {
		this.$cell = $(this.options.template)
					.width(this.options.width)
					.height(this.options.height);
		this._positionCell(x, y);
		if (Math.random() > 0.9) {
			this.$cell.addClass('flower');
		}
		//h.debug('[',this.options.fullName,'] build ::' ,this.$cell);
		return this.$cell;
	},
	_positionCell: function (xCell, yCell) {
		var top, left, worldWidth = this.options.worldWidth;
		top = (xCell * (this.options.height/2)) + (yCell * (this.options.height/2));
		left = worldWidth/2 - ((this.options.width/2)*(xCell+1)) + (yCell * (this.options.width/2));

		this.$cell.css({
			top: top+'px',
			left: left+'px'
		})
	}
});


var world = h.game.world({
	width: 10,
	height: 10
});