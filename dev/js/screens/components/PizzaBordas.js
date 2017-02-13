var PizzaBordas = Templater.extend({

	type: 'PizzaBordas',

	constructor: function(config){

		this.BordasService = config.BordasService;

		this.OrderManager = config.OrderManager;

		this.base.call(this, config);
	},

	binds: function() {

		this.BordasService.BordasList.render(this.dom);
	},

	events: {
		'click li': function(index, e) {
			this.OrderManager.addBordaToCurrentPizza(this.BordasService.getItem(index));
		}
	},

	template: '' +
		'<div class="pizza-bordas-wrap"><div>'

});