(function(h, $) {
	$.extend(h, {
		object: function () { // inspired by jQuery widget factory
			var arguments = $.makeArray(arguments),
				prototype = arguments.pop(), // prototype is always the last argument
				newObjectName = arguments.shift(), // object name is always the first argument
				decorators = arguments,
				decoratorPrototype,
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
				i = decorators.length,
				j,
				pathToParent;
				dna = [];

			if ( i === 0 ) {
				baseObject = {
					_create: $.noop
				}
			} else {
				// merge & keep a list of all decorators
				while ( i-- ){
					dna.push(decorators[i]);
					pathToParent = h.getPath(decorators[i]);
					decoratorPrototype = h[ pathToParent.namespace ].prototype[ pathToParent.name ];
					h.debug(decoratorPrototype);
					if (typeof decoratorPrototype.dna !== undefined) {
						j = decoratorPrototype.dna.length;
						while ( j-- ){
							// don't add 2 times the same decorator
							if ( $.inArray(decoratorPrototype.dna[j], dna) === -1 ) {
								dna.push(decoratorPrototype.dna[j]);
							}
						}
					}
					baseObject = $.extend(baseObject, decoratorPrototype);
				}
			}
			// create a new object with all methods public
			augmentedObject = $.extend(true, augmentedObject, baseObject, prototype);
			h.debug('[object] ',fullName,' :: ', augmentedObject);


			var createInstance = function (options) {
				var instance,
					tempDna = {};
					publicFunctions = {},
					generalSettings = (h.settings && h.settings[namespace] && h.settings[namespace][name]) ? h.settings[namespace][name] : {};
				// create a new instance object
				// h.debug('['+name+']', tempDna);
				instance = Object.create(augmentedObject);
				// merge options
				instance.options = $.extend(true, {}, augmentedObject.options, options, generalSettings, baseOptions);
				// add the super method
				if (dna.length) {
					instance._super = function (methodName, datas) {
						// define a custom queu decorator list per method
						tempDna[methodName] = tempDna[methodName] || Object.create(dna);
						h.debug('['+this.options.object+']', methodName, ' :: ', tempDna);
						var path;
						if (tempDna[methodName].length !== 0) {
							datas = datas || [];
							// Call each decorator in order of apparition
							path = h.getPath(tempDna[methodName].pop());
							if (h[path.namespace] &&
								h[path.namespace].prototype[path.name] &&
								h[path.namespace].prototype[path.name][methodName] &&
								$.isFunction(h[path.namespace].prototype[path.name][methodName])) {
									h[path.namespace].prototype[path.name][methodName].apply(instance, datas);
									if (tempDna[methodName].length === 0) {
										tempDna[methodName] = Object.create(dna);
									}
							} else {
								tempDna[methodName] = Object.create(dna);
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
			h[ namespace ].prototype[ name ].dna = dna;
			// Create the object factory
			h[ fullName ] = createInstance;
		}
	});
}(hiswe, jQuery));