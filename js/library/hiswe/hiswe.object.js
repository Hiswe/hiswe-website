(function(h, $) {
	$.extend(h, {
		object: function () { // inspired by jQuery widget factory
			var arguments = $.makeArray(arguments),
				prototype = arguments.pop(), // prototype is always the last argument
				newObjectName = arguments.shift(), // object name is always the first argument
				base = arguments,
				pathToObject = h.getPath(newObjectName),
				namespace = pathToObject.namespace,
				name = pathToObject.name,
				fullName = pathToObject.fullName,
				baseObject = {},
				baseOptions = {
					object: name,
					namespace: namespace,
					fullName: fullName
				},
				augmentedObject = {},
				i = base.length,
				pathToParent;
				dna = [];

			if ( i === 0 ) {
				baseObject = {
					_create: $.noop
				}
			} else {
				// merge all parents
				while ( i-- ){
					dna.push(base[i]);
					pathToParent = h.getPath(base[i]);
					baseObject = $.extend(baseObject, h[ pathToParent.namespace ].prototype[ pathToParent.name ]);
				}
			}
			// create a new object with all methods public
			augmentedObject = $.extend(true, augmentedObject, baseObject, prototype);
			h.debug('[object] ',fullName,' :: ', augmentedObject);


			var createInstance = function (options) {
				var instance,
					tempDna = Object.create(dna);
					publicFunctions = {},
					generalSettings = (h.settings && h.settings[namespace] && h.settings[namespace][name]) ? h.settings[namespace][name] : {};
				// create a new instance object
				instance = Object.create(augmentedObject);
				// merge options
				instance.options = $.extend(true, {}, augmentedObject.options, options, generalSettings, baseOptions);
				// add the super method
				if (dna.length) {
					instance._super = function (methodName, datas) {
						var path;
						if (tempDna.length !== 0) {
							datas = datas || [];
							path = h.getPath(tempDna.pop())
							if (h[path.namespace]
								&& h[path.namespace].prototype[path.name]
								&& h[path.namespace].prototype[path.name][methodName]
								&& $.isFunction(h[path.namespace].prototype[path.name][methodName])) {
									h[path.namespace].prototype[path.name][methodName].apply(instance, datas);
							} else {
								tempDna = Object.create(dna);
								return;
							}
						} else {
							tempDna = Object.create(dna);
							return;
						}
					}
				}
				// call the create function
				instance._create.apply(instance, []);

				// Reveal each functions not prefixed with an underscore
				for (var key in instance) {
					if (!/^_/.test(key) && $.isFunction(instance[key])){
						publicFunctions[key] = $.proxy(instance[key], instance);
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