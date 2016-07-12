var LoginScreenHeader = Templater.extend({

	type : 'LoginScreenHeader',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click' : function(){
			console.log( this.parent.show() );
		}
	},

	template : `
	<div class="login-screen-header">
		<h1>My app</h1>
	</div>
	`

});