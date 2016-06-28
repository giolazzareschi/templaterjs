var ListFlavoursItem = Templater.extend({

	type : 'ListFlavoursItem',

	autopaint : true,

	events : {
		'click button' : function(e){			
			this.parent.template_data.items.pop( this.index );
		}
	},

	template : `
		<li>
			<label>{{item.name}}</label>
			<button>X</button>
		</li>

	`

});