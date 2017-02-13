var OrderManager = Templater.extend({

	type: 'OrderManager',

	current_pizza: 0,

	createBlankPizza: function(tamanho_data) {
		var 
			buffer = this.template_data.pizzas,
			new_buffer = [],
			new_pizza = {
				tamanho: tamanho_data.id,
				nm_tamanho: tamanho_data.nm_tamanho,
				nm_borda: '',
				borda: 0,
				sabores: []
			};

		for(var i=0, qt=buffer.length; i<qt; i++)
			new_buffer[ i ] = buffer[ i ];

		new_buffer.push(new_pizza);

		this.setData({
			pizzas: new_buffer
		});

		this.current_pizza = new_buffer.length-1;
	},

	addBordaToCurrentPizza: function(borda_data) {
		var
			buffer = this.template_data.pizzas,
			new_buffer = [],
			current_pizza;

		for(var i=0, qt=buffer.length; i<qt; i++)
			new_buffer[ i ] = buffer[ i ];

		current_pizza = new_buffer[ this.current_pizza ];
		current_pizza.borda = borda_data.borda;
		current_pizza.nm_borda = borda_data.nm_borda;

		this.setData({
			pizzas: new_buffer
		});
	},

	addSaborToCurrentPizza: function(sabor_data) {
		var 
			buffer = this.template_data.pizzas,
			new_buffer = [],
			current_pizza;

		for(var i=0, qt=buffer.length; i<qt; i++)
			new_buffer[ i ] = buffer[ i ];

		new_buffer[this.current_pizza].sabores.push({
			nm_sabor: sabor_data.nm_sabor
		});

		this.setData({
			pizzas: new_buffer
		});
	},

	removeAllPizzas: function() {
		this.setData({
			pizzas: []
		});
	},

	removePizzaByIndex: function( index ) {

		var 
			buffer = this.template_data.pizzas,
			new_buffer = [];

		for(var i=0, qt=buffer.length; i<qt; i++)
			new_buffer[ i ] = buffer[ i ];

		new_buffer.splice(index, 1);

		this.setData({
			pizzas: new_buffer
		});
	},

	canSave: function() {
		if( this.template_data.pizzas.length || this.template_data.bebidas.length )
			this.setData({
				hideWhenOrderIsEmpty: false
			});
		else
			this.setData({
				hideWhenOrderIsEmpty: true
			});
	},

	template: '<order-manager></order-manager>'

});