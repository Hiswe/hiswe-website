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
		hiswe.out(spec.noise);	
		return spec.noise || '';
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

/*
var constructor = function (spec, my) {
	// spec === all argumemts to constructs a new instance
	var that, privateInstanceVariable;
	my = my || {};	
	// add shared variables and functions to my
	that = {}; // create a new object
	// add privilegd methods to that
	return that;
}
//*/