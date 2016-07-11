var LoginScreenFooter = Templater.extend({

	type : 'LoginScreenFooter',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click button' : function(){
			console.log( this.parent.template_data.$$item__ );
		}
	},

	template : `
	<div class="login-screen-footer">
		<button>Login</button>
	</div>
	`

});