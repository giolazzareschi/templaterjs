var ListFlavoursItem = Templater.extend({

	type : 'ListFlavoursItem',

	autopaint : true,

	binds : function(){		
		this.phones = new ListFlavourPhones({
			template_data : {
				items : this.template_data.item.phones
			}
		});

		this.phones.render( this.elements.phones );		
	},

	events : {
		'click .removeall' : function(e){			
			this.parent.template_data.items.pop( this.index );
		},
		'click .removecell' : function(e){			
			debugger;
		}
	},

	template : `
		<li>
			<label>{{item.name}}</label>
			<ul id="phones"></ul>
			<button class="removeall">X</button>
		</li>

	`

});