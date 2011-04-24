h.debug( 'info',h);
h.module('living.spore' ,{
	d: {
		name: 'spore',
		position: 0
	},
	f: {
		move: function () {
			// h.debug(this);
			// h.debug('[Spore] move ::',d.position,'->',d.position + 1);
			// d.position += 1;
		}
	}
});

var pouic = h.living.spore({
	name: 'pouic',
	position: 5,
});

pouic('move');