var BordasService = Templater.extend({

	type: 'BordasService',

	itemsServer: [],

	model: {
		url: '../igoapi/pizzaria/bordas'
	},

	constructor: function(config) {

		if(config && config.onReady)
			this.onReady = config.onReady;

		this.base.call(this, config);
	},

	binds: function() {

		this.BordasList = null;

		this.request();
	},

	onReady: function() {},

	request: function() {
		this.model.get(this.response,this.response);
	},

	getItem: function(index) {
		return this.itemsServer[ index ];
	},

	response: function(data) {
		this.itemsServer = data;

		this.BordasList = new BordasList({
			template_data: {
				items: data
			}
		});

		this.BordasList.render(this.dom);

		this.onReady();
	},

	template: '<bordas-service></bordas-service>'

});