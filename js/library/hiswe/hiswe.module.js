(function(h, $) {
	$.extend(hiswe, { // TODO: ref
		module: function (name, base, prototype) { // inspired by jQuery widget factory
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ],
				fullName = namespace+h.capitalize(name),
				generalSettings = (h.settings && h.settings[nameSpace] && h.settings[nameSpace][base]) ? h.settings[nameSpace][base] : {},
				baseModule,
				baseOptions = $.extend(true, {}, generalSettings, {
					object: name,
					namespace: namespace,
					fullName: fullName
				}),
				augmentedModule = {};

			if ( !prototype ) {
				prototype = base;
				base = h.module;
			}
			// create a new object with all methods public
			baseModule = {
				_create: $.noop
			};
			augmentedModule = $.extend(true, {}, baseModule, prototype);
			h.debug('[Module] ',fullName,' :: ', augmentedModule);
			var createInstance = function (options) {
				// create a new instance object
				var instance = $.extend(true, {}, augmentedModule);
				// merge options
				instance.options = $.extend(true, {}, augmentedModule.options, options, baseOptions);
				// call the create function
				instance._create.apply(instance, []);
				// bridge each function call to the module methods
				var bridgeInstance = function (method) {
					if (!/^_/.test(method) && $.isFunction(instance[method])) {
						return instance[method].apply(instance, $.makeArray(arguments).slice(1));
					}
				};
				return bridgeInstance;
			};

			// expose him to framework name space
			h[ namespace ] = h[ namespace ] || {}; // create the namespace if none
			// at module call create a new object
			h[ namespace ][ name ] = createInstance();
		}
	});
})(hiswe, jQuery);