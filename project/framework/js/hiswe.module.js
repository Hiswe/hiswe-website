(function(h, $) {
	$.extend(hiswe, {
		module: function (name, base, prototype) { // inspired by jQuery widget factory
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ];

			if ( !prototype ) {
				prototype = base;
				base = h.module;
			}
			// create a new object with all methods public
			var baseModule = {
				d:{
					_widget: name,
					_namespace: namespace,
					version: 1
				},
				f: {

				}
			};
			var	augmentedModule = $.extend(true, {}, prototype, baseModule);
			h.debug('[Module] augmented Module :: ');
			h.debug('dir', augmentedModule );
			var createInstance = function (options) {
				var d = $.extend({}, options, augmentedModule.d);

				var f = $.extend({}, augmentedModule.f);
				// $.each(d, function(key, value){
				// 	if(!/^_/.test(key)){
				// 		newObject['get' + h.capitalize(key)] = function () {
				// 			return value;
				// 		};
				// 	}
				// });
				// for (var method in f) {
				// 	if(!/^_/.test(method)){
				// 		newObject[method] = f[method];
				// 	}
				// }
				var bridgeInstance = function (method) {
					h.debug('[',d._widget,'] bridge ::', method);
					if (!/^_/.test(method) && $.isFunction(f[method])) {
						h.debug('[',d._widget,'] bridge :: datas are', d);
						h.debug('dir', this);
						f[method].apply(this, $.makeArray(arguments).slice(1));
					} else {
						h.debug('[',d._widget,'] bridge :: no method', method);
						h.debug('[',d._widget,'] bridge :: methods are', f);
					}

				};
				return bridgeInstance;
			};

			// expose him to framework name space
			h[ namespace ] = h[ namespace ] || {}; // create the namespace if none
			h[ namespace ][ name ] = createInstance;
			// at module call create a new object


			// bridge each function call to the module methods







		}
	});

})(hiswe, jQuery);