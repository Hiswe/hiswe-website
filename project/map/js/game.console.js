(function (h, $) {
	h.module('game.console', {
		_create: function () {
			this.$console = $('<div />', {
				'class': 'console'
			});
			this.$console.appendTo($('body'));
			h.debug('info', '[Console] Create');
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
}(hiswe, jQuery));