h.debug( 'info',h);
h.module('living.spore' ,{
	d: {

	},
	f: {
		move: function () {
			h.debug('log', 'move');
		}
	}
});
h.debug( 'log','spore');
h.debug('dir', h.living.spore);


h.debug('log', h.living.spore.getName());
h.debug('log', h.living.spore.getVersion());