var DraftArea = Templater.extend({

	type: 'DraftArea',

	constructor: function(config) {

		this.OrderManager = config.OrderManager;

		this.base.call(this, config);
	},

	binds: function() {

		this.DraftList = new DraftList({
			OrderManager: this.OrderManager,
			template_data: {
				items: this.template_data.pizzas
			}
		});

		this.DraftList.render(this.elements.draft_items);
	},

	reactions: {
		'hideWhenOrderIsEmpty': function() {
			
		}
	},

	template: '' +
		'<draf-area>'+
			'<div class="draft-area">'+
				'<h4>Resumo:</h4>'+
				'<div class="form">'+
					'<div class="form-wrap">'+
						'<div class="form-row">'+
							'<div class="grid-hundred">'+
								'<button hide="{{hideWhenOrderIsEmpty}}" class="btn-primary">Salvar pedido</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'<div id="draft_items">'+
				'</div>'+
			'</div>'+
		'</draf-area>'

});