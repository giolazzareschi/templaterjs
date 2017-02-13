var DraftList = TemplaterList.extend({

	type: 'DraftList',

	constructor: function(config) {

		this.OrderManager = config.OrderManager;

		this.base.call(this, config);
	},

	template: '<ul></ul>'
	
});