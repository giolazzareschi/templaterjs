var DraftListItem = Templater.extend({
	
	type: 'DraftListItem',

	binds: function() {
		this.DraftPizzaSabores = new DraftPizzaSabores({
			template_data: {
				items: this.template_data.sabores
			}
		});

		this.DraftPizzaSabores.render(this.elements.draft_sabores);
	},

	events: {
		'click .remove-item': function(index, e) {
			this.__parent.OrderManager.removePizzaByIndex(this.__index);
		}
	},

	template: ''+
		'<li class="draft-card">'+
			'<div class="remove-item icon-cancel"></div>'+
			'<h5>{{nm_tamanho}}</h5>'+
			'<h3>{{nm_borda}}</h3>'+
			'<div id="draft_sabores"><div>'+
		'</li>'
});