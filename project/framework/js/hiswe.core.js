(function(global, $) {
	var hiswe = {
		VERSION: '0.0.1',
		debugMode: true
	};

	if (global.hiswe) {
		throw new Error('Hiswe framework has already been defined');
	} else {
		global.hiswe = global.h = hiswe;
	}

	h.debugMode = (h.debugMode === true && typeof window.console !== "undefined");

	$.extend(h,{
		debug: function (type) {
			if (h.debugMode === true) {
				var params = $.makeArray(arguments);
				try {
					window.console[type].apply(window, params.slice(1));
				} catch (e) {
					window.console['log'].apply(window, params);
				}
			}
		},
		capitalize: function (string) {
			var firstChar = string.substr(0,1).toUpperCase();
			return firstChar + string.substr(1);
		}
	});
})(typeof window === 'undefined' ? this : window, jQuery);