var GlobalContext = Templater.extend({

	type: 'GlobalContext'

},{
	PizzariaData: {},

	Cart: {},

	Workspace: {},

	UserCoordenates: {},

	authenticationHash: 'igomanagerauth',

	StorageManager: new StorageManager(),

	Router: new Router(),

	url_prefix: 'https://localhost/',

	api_prefix: 'https://localhost/api/',

	base_api: 'https://localhost/igoapi/',

	base_url: function(route) {
		return GlobalContext.base_api + route;
	},

	getStorageData: function(hash) {
		return this.StorageManager.get(hash);
	},

	setStorageData: function(hash, data) {
		return this.StorageManager.set(hash, data);
	},

	removeStorageData: function(hash) {
		return this.StorageManager.remove(hash);
	},

	hasAuthenticationToken: function() {
		return this.getStorageData(this.authenticationHash);
	},

	clearAuthenticationToken: function() {
		this.removeStorageData(this.authenticationHash);
	},

	restartApp: function() {
		this.clearAuthenticationToken();
		this.Router.href('');
	},

	navigate: function(route) {
		this.Router.href(route);
	},

	navigateToLastRoute: function() {
		this.Router.navigateToLastRoute();	
	},

	getAuthorizationToken: function() {
		return this.StorageManager.get(this.authenticationHash);
	},

	preserveAuthenticationToken: function(auth_token) {
		this.StorageManager.set(this.authenticationHash, auth_token);
	},

	setUserCoordenates: function(coords) {
		GlobalContext.UserCoordenates.latitude = coords.latitude;
		GlobalContext.UserCoordenates.longitude = coords.longitude;
		GlobalContext.StorageManager.set('coord_latitude', coords.latitude);
		GlobalContext.StorageManager.set('coord_longitude', coords.longitude);
	},

	getUserCoordenates: function() {
		var
			latitude = GlobalContext.StorageManager.get('coord_latitude'),
			longitude = GlobalContext.StorageManager.get('coord_longitude');
		return {
			latitude: latitude,
			longitude: longitude
		}
	},

	getApiRoute: function(route) {
		return GlobalContext.api_prefix + route;
	}
});