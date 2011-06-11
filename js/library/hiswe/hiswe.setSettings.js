(function(h, $) {
	$.extend(hiswe, {
		setSettings: function (name, settings) {
			var namespace = name.split( "." )[ 0 ],
				name = name.split( "." )[ 1 ];

			h.debug('[Settings] for '+namespace+'.'+name,'::', settings);

			// create a settings section
			h['settings'] = h['settings'] || {};
			// expose settings
			h['settings'][ namespace ] = h['settings'][ namespace ] || {}; // create the namespace if none
			h['settings'][ namespace ][ name ] = settings;
		}
	});
})(hiswe, jQuery);