var Router = Base.extend({

	routes : {},

	before_action : undefined,

	constructor : function(){

		window.addEventListener('hashchange', this.change.bind(this));

		this.base.call(this, arguments);
	},

	setLoginRoute: function(login_route) {
		this.login_route = login_route || 'login';
	},

	register : function( route, callback ){

		this.routes[ route ] = callback;
	},

	href : function( route ){

		var current_route = this.getCurrentRoute();

		if( current_route === route )
			this.change();
		else
			window.location.hash = route;
	},

	navigateToLastRoute: function() {
		var
			lastRoute = this.getLastAccessedRoute() || '';

		this.href(lastRoute);
	},

	setLastAccessedRoute: function(route) {
		GlobalContext.setStorageData('lastAccessedRoute', route);
	},

	getLastAccessedRoute: function() {
		return GlobalContext.getStorageData('lastAccessedRoute');
	},

	clearLastAccessedRoute: function() {
		return GlobalContext.removeStorageData('lastAccessedRoute');
	},

	getCurrentRoute : function(){
		return window.location.hash.replace('#','');
	},

	entry : false,

	change : function(){

		var 
			last = this.getLastAccessedRoute(),
			route = this.getCurrentRoute(),
			body = this.routes[ route ];

		this.setLastAccessedRoute(route);

		if(GlobalContext.hasAuthenticationToken()){
			if( body && route !== this.login_route )
				body();
			else
				this.href('');
		}else{
			if( route === this.login_route )
				body();
			else
				this.href(this.login_route);
		}
	}

});