var LeftMenu = Screen.extend({

	type : 'LeftMenu',

	autopaint : true,

	binds : function(){
		this.addClass("app-left-menu");

		this.base();
	},

	content : `
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