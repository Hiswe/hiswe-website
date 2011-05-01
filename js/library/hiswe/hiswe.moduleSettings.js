(function(h, $) {
	$.extend(hiswe, {
		moduleSettings: function (name, settings) { // inspired by jQuery widget factory
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ];

			h.debug('[Module] settings :: ',name , settings);

			// create a settings section
			h['settings'] = h['settings'] || {};
			// expose him to framework name space
			h['settings'][ namespace ] = h['settings'][ namespace ] || {}; // create the namespace if none
			// at module call create a new object
			h['settings'][ namespace ][ name ] = settings;
		}
	});
})(hiswe, jQuery);