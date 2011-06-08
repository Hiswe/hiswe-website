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
					_create: $.noop,
				};
			}else{
				var baseNamespace = base.split( "." )[ 0 ],
					baseName = base.split( "." )[ 1 ];
				baseObject = h[ baseNamespace ].prototype[ baseName ];
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
				var instance,
					super;
					publicFunctions = {};
				// create a new instance object
				instance = Object.create(augmentedObject);
				// merge options
				instance.options = $.extend(true, {}, augmentedObject.options, options, baseOptions);
				// test super
				instance.super = Object.create(baseObject);
				// call the create function
				instance._create.apply(instance, []);
				// Reveal each functions not prefixed with an underscore
				for (var key in instance) {
					if (!/^_/.test(key) && $.isFunction(instance[key])){
						publicFunctions[key] = instance[key];
					}
				}
				return publicFunctions;
			};

			// expose him to framework name space
			h[ namespace ] = h[ namespace ] || {}; // create the namespace if none
			// expose the prototype
			h[ namespace ].prototype = h[ namespace ].prototype || {};
			h[ namespace ].prototype[ name ] = augmentedObject;
			// Create the object factory
			h[ fullName ] = createInstance;
		}
	});
}(hiswe, jQuery));