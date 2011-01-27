var pageGauge = function(){
	// data
	var d = {};
	// functions
	var f = {
		init : function () {
			f._makeCache();
			f._initGauge();
			f._initSyntaxicColoration();
		},
		_initGauge : function () {
			d.$gauge.gauge();
			setTimeout(moveTo50,2000);
			function moveTo50 () {
				d.$gauge.eq(0).gauge('setPercent', 5);
			}
		},
		_initSyntaxicColoration : function () {
			//SyntaxHighlighter.config.tagName = 'pre';
			SyntaxHighlighter.all();
		},
		_makeCache : function () {
			d.$gauge = $('#jsGauge dl');
		}
	};
	return {
		init : f.init
	};
}();


pageGauge.init();
/*
$(function(){
	pageGauge.init();
});
//*/