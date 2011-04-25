h.debug( 'info',h);
h.module('living.cell' ,{
	options: {
		position: 0

	},
	move: function () {
		// h.debug('[spore] move', this);
		h.debug('[Spore',this.options.name,'] move ::', this.options.position,'->',this.options.position + 1);
		this.options.position += 1;
	},
	getPosition: function () {
		h.debug('[Spore',this.options.name,'] getPosition ::', this.options.position);
		return this.options.position;
	}
});

var pouic = h.living.cell({
	name: 'pouic',
	position: 5
});

pouic.livingCell('move');
pouic.livingCell('getPosition');

var clapou = h.living.cell({
	name: 'larve',
	position: 27
});

clapou.livingCell('getPosition');
clapou.livingCell('move');
clapou.livingCell('getPosition');
pouic.livingCell('getPosition');