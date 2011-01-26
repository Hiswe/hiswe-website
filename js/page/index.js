var index = {
	init : function () {
		this.gaugeInit();
	},
	gaugeInit : function () {
		var that = this;
		this.$gauge = $('#jsGauge');
		this.$gauge.gauge();
		setTimeout(changeGauge,2000);
		function changeGauge () {
			that.$gauge.gauge('setPercent', random100());
			setTimeout(changeGauge,10000);
		}
		function random100 () {
			return Math.round(Math.random()*100);
		}
		
	}
}
$(function(){
	index.init();
});