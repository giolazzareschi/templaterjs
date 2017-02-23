var GlobalContext = Templater.extend({

	type: 'GlobalContext',

	useAuthToken: false,

	authenticationHash: 'managerauthtoken',

	binds: function() {
		this.StorageManager = new StorageManager();
		this.Router = new Router();
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
	}

});