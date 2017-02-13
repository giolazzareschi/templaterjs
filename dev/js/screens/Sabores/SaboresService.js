var SaboresService = Templater.extend({

	type: 'SaboresService',

	itemsServer: [],

	model: {
		url: '../igoapi/pizzaria/sabores'
	},

	constructor: function(config) {

		if(config && config.onReady)
			this.onReady = config.onReady;

		this.base.call(this, config);
	},

	binds: function() {

		this.SaboresList = null;

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

		this.SaboresList = new SaboresList({
			template_data: {
				items: data
			}
		});

		this.SaboresList.render(this.dom);

		this.onReady();
	},

	template: ''+
		'<div class="sabores"></div>'

});