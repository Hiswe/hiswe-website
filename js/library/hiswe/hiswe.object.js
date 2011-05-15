(function(h, $) {
	$.extend(hiswe, {
		object: function (name, base, prototype) { // inspired by jQuery widget factory
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ],
				fullName = namespace+h.capitalize(name),
				baseObject;

			if ( !prototype ) {
				prototype = base;
				base = h.Object,
				baseObject = {
					_create: $.noop
				};
			}else{
				baseNamespace = base.split( "." )[ 0 ],
				baseName = base.split( "." )[ 1 ];
				baseObject = h[ baseNamespace ][ baseName ];
			}
			// create a new object with all methods public
			var baseOptions = {
				Object: name,
				namespace: namespace,
				fullName: fullName
			};
			var	augmentedObject = $.extend(true, {}, baseObject, prototype);
			h.debug('[object] ',fullName,' :: ', augmentedObject);


			var createInstance = function (options) {
				// create a new instance object
				var instance = $.extend(true, {}, augmentedObject);
				// merge options
				instance.options = $.extend(true, {}, augmentedObject.options, options, baseOptions);
				// call the create function
				instance._create.apply(instance, []);
				// bridge each function call to the Object methods
				var bridgeInstance = function (method) {
					if (!/^_/.test(method) && $.isFunction(instance[method])) {
						return instance[method].apply(instance, $.makeArray(arguments).slice(1));
					}
				};
				var my = {};
				my[fullName] = bridgeInstance;
				return my;
			};

			// expose him to framework name space
			h[ namespace ] = h[ namespace ] || {}; // create the namespace if none
			// expose the prototype
			h[ namespace ][ name ] = augmentedObject;
			// Create the object factory
			h[ fullName ] = createInstance;
		}
	});
}(hiswe, jQuery));