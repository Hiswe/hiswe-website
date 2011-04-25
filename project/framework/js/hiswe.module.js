(function(h, $) {
	$.extend(hiswe, {
		module: function (name, base, prototype) { // inspired by jQuery widget factory
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ],
				fullName = namespace+h.capitalize(name);

			if ( !prototype ) {
				prototype = base;
				base = h.module;
			}
			// create a new object with all methods public
			var baseModule = {
				options: {
					_module: name,
					_namespace: namespace,
					version: 1
				}
			};
			var	augmentedModule = $.extend(true, {}, prototype, baseModule);
			h.debug('[Module] augmented Module :: ');
			h.debug('dir', augmentedModule );
			var createInstance = function (options) {
				// creat a new instance
				var instance = $.extend(true, {}, augmentedModule);
				// merge options
				instance.options = $.extend(true, {}, augmentedModule.options, options);
				// bridge each function call to the module methods
				var bridgeInstance = function (method) {
					if (!/^_/.test(method) && $.isFunction(instance[method])) {
						instance[method].apply(instance, $.makeArray(arguments).slice(1));
					}
				};
				var my = {};
				my[fullName] = bridgeInstance;
				return my;
			};

			// expose him to framework name space
			h[ namespace ] = h[ namespace ] || {}; // create the namespace if none
			// at module call create a new object
			h[ namespace ][ name ] = createInstance;
		}
	});
})(hiswe, jQuery);