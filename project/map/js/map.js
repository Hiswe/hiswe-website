
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

var log = h.game.console();
var world = h.game.world();