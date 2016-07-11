var LoginScreenHeader = Templater.extend({

	type : 'LoginScreenHeader',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click button' : function(){
			console.log( this.parent.template_data.$$item__ );
		}
	},

	template : `
	<div class="login-screen-header">
		<h1>My app</h1>
	</div>
	`

});