var ListFlavourPhonesItem = Templater.extend({

	type : 'ListFlavourPhonesItem',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click .removecell' : function(e){					
			this.__parent.template_data.items[ this.__index ] = 'dsad';
		}
	},

	template : `
		<li>
			<input value="{{item}}" /><button class="removecell">Remove Cell</button>
		</li>

	`

});