var LoginScreen = Templater.extend({

	type : 'LoginScreen',

	autopaint : true,

	binds : function(){
		this.appmainheader = new LoginScreenHeader({
			parent : this
		});

		this.appmainfooter = new LoginScreenFooter({
			parent : this
		});
	},

	template : `
	<div class="login-screen">
		<div class="login-screen-mask">
			<div class="vcenter">
			<div class="row-login">
				<input value="{{username}}" placeholder="Username" />
			</div>
			<div class="row-login">
				<input type="password" value="{{password}}" placeholder="Password" />
			</div>
			</div>
		</div>
	</div>
	`

});