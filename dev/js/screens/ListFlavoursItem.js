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

		this.update_time();
	},

	update_time : function(){
		var me = this;
		
		setInterval(function(){
			me.template_data.item.name = +new Date;			
		}, 1000);
	},

	events : {
		'click .removeall' : function(e){			
			this.__parent.template_data.items.pop( this.__index );
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