$(function(){
	/*SyntaxHighlighter.config.tagName = 'pre';
	SyntaxHighlighter.all();*/
	var $gauge = $('#jsGauge dl');
	$gauge.gauge();
	setTimeout(moveTo50,2000);
	function moveTo50 () {
		$gauge.eq(0).gauge('setPercent', 5);
	}
});