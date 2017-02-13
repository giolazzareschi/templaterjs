var TamanhosService = Templater.extend({

	type: 'TamanhosService',

	itemsServer: [],

	model: {
		url: '../igoapi/pizzaria/tamanhos'
	},

	constructor: function(config) {

		if(config && config.onReady)
			this.onReady = config.onReady;

		this.base.call(this, config);
	},

	binds: function() {

		this.TamanhosList = null;

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

		this.TamanhosList = new TamanhosList({
			template_data: {
				items: data
			}
		});

		this.TamanhosList.render(this.dom);

		this.onReady();
	},

	template: ''+
		'<div class="tamanhos"></div>'

});