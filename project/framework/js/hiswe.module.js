(function(h, $) {
	$.extend(hiswe, {
		module: function (name, base, prototype) { // inspired by jQuery widget factory
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ],
				publishModule = function (d, f) {
					var newObject = {};
					$.each(d, function(key, value){
						if(!/^_/.test(key)){
							newObject['get' + h.capitalize(key)] = function () {
								return value;
							};
						}
					});
					for (var method in f) {
						if(!/^_/.test(method)){
							newObject[method] = f[method];
						}
					}
					return newObject;
				},
				baseModule = function (d, f) {
					d = $.extend({
						name: name,
						version: 1
					}, d);
					f = $.extend({}, f);
					return publishModule(d, f);
				};


			if ( !prototype ) {
				prototype = base;
				base = h.module;
			}
			// create the namespace if none
			h[ namespace ] = h[ namespace ] || {};

			h[ namespace ][ name ] = baseModule(prototype.d, prototype.f);

		}
	});

})(hiswe, jQuery);