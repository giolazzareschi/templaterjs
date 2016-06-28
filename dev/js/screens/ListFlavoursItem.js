var ListFlavoursItem = Templater.extend({

	type : 'ListFlavoursItem',

	autopaint : true,

	events : {
		'click button' : function(e){
			console.log( this );
		}
	},

	template : `
		<li>
			{{item}} <button> X </button>
		</li>

	`

});