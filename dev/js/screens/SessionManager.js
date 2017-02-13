var SessionManager = Templater.extend({

	type: 'SessionManager',

	binds: function() {
		GlobalContext.SessionManager = this;
	},

	isAuthenticated: function() {
		if( this.hasAuthenticationToken() )
			return true;

		return false;
	},

	hasAuthenticationToken: function() {
		return GlobalContext.hasAuthenticationToken();
	},

	clearAuthenticationToken: function() {
		GlobalContext.clearAuthenticationToken();
	},

	preserveAuthenticationToken: function(auth_token) {
		GlobalContext.preserveAuthenticationToken(auth_token);
	},

	logout: function() {
		this.clearAuthenticationToken();
		this.renderLoginScreen();
	},

	renderLoginScreen: function() {
		GlobalContext.navigate('login');
	},

	renderView: function( viewClass ) {
		viewClass.render(this.dom);
	},

	template: ''+
		'<session-manager class="fullsized">'+
		'</session-manager>'

});