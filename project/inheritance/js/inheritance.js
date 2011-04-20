var hiswe = {
	object: function(o){
		function F() {}
        F.prototype = o;
        return new F();
	},
	out : function (message) {
		this.$p.clone().text(message).appendTo(this.$test)
	},
	$test : $('#test'),
	$p : $('<p />', {class : 'messageOut'})
};

var spore = function (spec) {	
	
	var that = {};
	
	that.getName = function () {
		hiswe.out(spec.name);
		return spec.name;
	};
	
	that.noise = function () {
		var noise = spec.noise || '';
		hiswe.out(noise);	
		return noise;
	};
	
	return that;
};

var pouic = spore({
	name : 'pouic',
	noise : 'pouiiiiiiiic'
}),clapou = spore({
	name : 'clopoo',
	noise : 'aîe'
});

pouic.getName();
pouic.noise();
clapou.getName();
clapou.noise();

var metaSpore = function (spec) {

	var that = spore(spec);
	
	that.loudNoise = function () {
		var loudNoise = spec.noise.toUpperCase() || '';
		hiswe.out(loudNoise);	
		return loudNoise;
	}
	
	return that;
};
var metaPouic = metaSpore({
	name : 'met-pouic',
	noise : 'pouiiIIIIiic'
});
metaPouic.getName();
metaPouic.noise();
metaPouic.loudNoise();


/*
var larve = function (spec, my) {
	// spec === all argumemts to constructs a new instance
	var that, privateInstanceVariable;
	my = my || {};

	// add shared variables and functions to my
	that = {}; // create a new object
	// add privileged methods to that
	return that;
}
*/


var pitou = function(){
	var d = {
		
	};

	var f = {
		_makePublicMethod: function () {
			var newObject = {};
			for (var method in f) {
				if(!/^_/.test(method)){
					newObject[method] = f[method];
				}
			} 
			return newObject;
		},
		init: function (spec) {
			console.info("[pitou] init ::" ,spec.name);
			f._makeCache(spec)
		},
		_makeCache: function (spec) {
			d.energy = spec.energy;
		},
		hit: function () {
			console.log('[pitou] hit');
			d.energy -= 1;
			console.log('[pitou] energy left ::', d.energy);
		},
		get_energy: function () {
			return d.energy;
		}
	};

	return f._makePublicMethod();
	
};

var groPitou = pitou();
var mediumPitou = pitou();
groPitou.init({
	name: 'Grö',
	energy: 54
});
mediumPitou.init({
	name: 'Guss',
	energy: 27
});


mediumPitou.hit();
mediumPitou.hit();
mediumPitou.hit();
groPitou.hit();

console.log(groPitou);