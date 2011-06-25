(function(h, $) {
	$.extend(h, {
		object: function ( name, base, prototype ) { // inspired by jQuery widget factory
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ],
				fullName = namespace + h.capitalize( name ),
				baseObject,
				baseOptions = {
					object: name,
					namespace: namespace,
					fullName: fullName
				},
				augmentedObject = {};


			if ( !prototype ) {
				prototype = base;
				base = h.Object,
				baseObject = {
					_create: $.noop
				}
			}else{
				var baseNamespace = base.split( "." )[ 0 ],
					baseName = base.split( "." )[ 1 ];
				baseObject = h[ baseNamespace ].prototype[ baseName ];
			}
			// create a new object with all methods
			augmentedObject = Object.create( baseObject );
			for ( var method in prototype ) {
				augmentedObject[ method ] = prototype[ method ];
			}
			h.debug( '[object] ', fullName,' :: ', augmentedObject );


			var createInstance = function ( options ) {
				var lastPrototypeCalled = {},
					instance,
					publicFunctions = {},
					generalSettings = ( h.settings && h.settings[ namespace ] && h.settings[ namespace ][ name ]) ?
						h.settings[ namespace ][ name ] : {};
				// create a new instance object
				instance = Object.create( augmentedObject );
				// merge options
				instance.options = $.extend( true, {}, augmentedObject.options, options, generalSettings, baseOptions );
				// add super method
				instance._super = function ( method, arguments , debug) {
					lastPrototypeCalled[ method ] = lastPrototypeCalled[ method ] || instance.__proto__;
					if ( debug ) h.debug ( '[', name, '] _super list :: ', lastPrototypeCalled );
					var currentProto = lastPrototypeCalled[ method ].__proto__;
					if ( debug ) h.debug( '[', name, '] _super', method , 'on proto', currentProto );
					if ( currentProto.__proto__ ) {
						lastPrototypeCalled[ method ] = currentProto;
					} else {
						lastPrototypeCalled[ method ] = instance.__proto__;
					}
					if ( currentProto[ method ] ) {
						currentProto[ method ].apply( instance, arguments );
					} else { // could not have have a _super method
							 // reinit for futur _super call
						if ( debug ) h.debug('[',name,'] _super :: No', method , 'on proto', currentProto );
						lastPrototypeCalled[ method ] = instance.__proto__;
					}
				};
				// call the create function
				instance._create.apply( instance, [] );

				// Reveal each functions not prefixed with an underscore
				for ( var key in instance ) {
					if (!/^_/.test( key ) && $.isFunction( instance[ key ] ) ) {
						publicFunctions[ key ] = $.proxy( instance[ key ], instance );
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
}( hiswe, jQuery ) );