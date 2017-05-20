var Router = Base.extend({

	routes : {},

	before_action : undefined,

	login_route: 'login',

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

	parseRoute: function( route_searched ) {

		var 
			result, 
			request_params = {};

		for(var route in this.routes){
			var 
				parts = route.split('/'),
				route_searched_parts = route_searched.split('/');

			if(parts[0] === route_searched_parts[0]){
				parts.splice(0,1);
				route_searched_parts.splice(0,1);

				parts.forEach(function(part, index){
					request_params[part.replace(':','')] = route_searched_parts[index];
				});

				result = this.routes[route].bind(undefined, request_params);

				break;
			}
		}

		return result;
	},

	change : function(){

		var 
			last = this.getLastAccessedRoute(),
			route = this.getCurrentRoute(),
			body = this.parseRoute(route);

		this.setLastAccessedRoute(route);

		if(true){
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