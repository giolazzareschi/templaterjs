var PizzaElements = Templater.extend({

	type: 'PizzaElements',

	service_counter: 0,

	constructor: function(config) {

		this.OrderManager = config.OrderManager;

		this.base.call(this, config);
	},

	binds: function() {

		this.service_counter = 0;

		this.TamanhosService = new TamanhosService({
			onReady: this.registerTamanhos.bind(this)
		});

		this.BordasService = new BordasService({
			onReady: this.registerBordas.bind(this)
		});

		this.SaboresService = new SaboresService({
			onReady: this.registerSabores.bind(this)
		});
	},

	registerTamanhos: function() {
		this.service_counter++;

		this.PizzaTamanhos = new PizzaTamanhos({
			OrderManager: this.OrderManager,
			TamanhosService: this.TamanhosService,
			template_data: this.template_data
		});

		this.renderTabs();
	},

	registerBordas: function() {
		this.service_counter++;

		this.PizzaBordas = new PizzaBordas({
			OrderManager: this.OrderManager,
			BordasService: this.BordasService,
			template_data: this.template_data
		});

		this.renderTabs();
	},

	registerSabores: function() {
		this.service_counter++;

		this.PizzaSabores = new PizzaSabores({
			OrderManager: this.OrderManager,
			SaboresService: this.SaboresService,
			template_data: this.template_data
		});

		this.renderTabs();
	},

	renderTabs: function() {
		if( this.service_counter === 3 ){

			this.Tabs = new Tabs([
				{
					title: 'Tamanhos',
					content: this.PizzaTamanhos
				},
				{
					title: 'Bordas',
					content: this.PizzaBordas
				},
				{
					title: 'Sabores',
					content: this.PizzaSabores
				}
			]);

			this.Tabs.render(this.dom);

			this.registerEvents();
		}
	},

	events: {
		'click .pizza-tamanhos-wrap li': function(index, e){
			this.Tabs.selectTab(1);
		},
		'click .pizza-bordas-wrap li': function(index, e){
			this.Tabs.selectTab(2);
		},
		'click .pizza-sabores-wrap li': function(index, e){
		}
	},

	template: ''+
		'<div class="elements-wrapper"></div>'

});