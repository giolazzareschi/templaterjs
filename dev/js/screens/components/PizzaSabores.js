var PizzaSabores = Templater.extend({

	type: 'PizzaSabores',

	constructor: function(config){

		this.SaboresService = config.SaboresService;

		this.OrderManager = config.OrderManager;

		this.base.call(this, config);
	},

	binds: function() {

		this.SaboresService.SaboresList.render(this.dom);
	},
	
	events: {
		'click li': function(index, e) {
			this.OrderManager.addSaborToCurrentPizza(this.SaboresService.getItem(index));
		}
	},

	template: '' +
		'<div class="pizza-sabores-wrap"><div>'

});