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

	// add Objet.create if not supported
	if (typeof Object.create !== 'function') {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}

	$.extend(h,{
		debug: function (type) {
			if (h.debugMode === true) {
				var params = $.makeArray(arguments);
				if ($.isFunction(global.console[type])) {
					global.console[type].apply(global.console, params.slice(1));
				}else{
					try {
						global.console.log.apply(global.console, params);
					}catch (e){}
				}
			}
		},
		setDebugMode: function (isInDebugMode) {
			h.debugMode = (isInDebugMode === true && typeof global.console !== "undefined");
			// IE9 console bug fix
			if (h.debugMode) {
				if (Function.prototype.bind && console && typeof console.log == "object") {
					["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
					  .forEach(function (method) {
						console[method] = this.call(console[method], console);
					  }, Function.prototype.bind);
				}
			}
		},
		capitalize: function (string) {
			var firstChar = string.substr(0,1).toUpperCase();
			return firstChar + string.substr(1);
		}
	});

	h.setDebugMode(h.debugMode);

})(typeof window === 'undefined' ? this : window, jQuery);