var ListFlavourPhonesItem = Templater.extend({

	type : 'ListFlavourPhonesItem',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click .removecell' : function(e){		
			this.template_data.item = "dsadsad";
		}
	},

	template : `
		<li>
			<input value="{{item}}" /><button class="removecell">Remove Cell</button>
		</li>

	`

});