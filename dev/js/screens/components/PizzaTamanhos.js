var PizzaTamanhos = Templater.extend({

	type: 'PizzaTamanhos',

	constructor: function(config){

		this.TamanhosService = config.TamanhosService;

		this.OrderManager = config.OrderManager;

		this.base.call(this, config);
	},

	binds: function() {

		this.TamanhosService.TamanhosList.render(this.dom);
	},

	events: {
		'click li': function(index, e) {
			this.OrderManager.createBlankPizza(this.TamanhosService.getItem(index));
		}
	},

	template: '' +
		'<div class="pizza-tamanhos-wrap"><div>'

});