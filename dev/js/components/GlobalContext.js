var GlobalContext = Templater.extend({

	type: 'GlobalContext'

},{
	env: window,

	authenticationHash: 'igocredentialstoken',

	StorageManager: new StorageManager(),

	Router: new Router(),
	
	PubSub: new PubSub(),

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
		if(this.userRouter)
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

	formatDate: function(created_at, show_time) {
		var
			date = new Date(created_at),
			day = GlobalContext.pad(date.getDate()),
			month = GlobalContext.pad(date.getMonth()+1),
			year = date.getFullYear(),
			hour = GlobalContext.pad(date.getHours()),
			minutes = GlobalContext.pad(date.getMinutes()),
			time = show_time ? ' ' + hour + ':' + minutes : '';

		return day+'/'+month+'/'+year + time;
	},

	mysqlDate: function(date) {
		return date.getFullYear()+'-'+
				this.pad(date.getMonth()+1)+'-'+
				this.pad(date.getUTCDate());
	},

	formatTime: function(created_at) {
		var
			date = new Date(created_at),
			hour = GlobalContext.pad(date.getHours()),
			minutes = GlobalContext.pad(date.getMinutes());

		return hour + ':' + minutes;
	},

	pad: function(number) {
		var zeros = "00";
		return (zeros+number).slice(-zeros.length);
	},

	formatMoney: function(num) {
		return GlobalContext.round(num ? num : 0).toFixed(2).replace('.',',');
	},
	
	round: function(num, precision) {
		if(precision)
			return Number(Math.round(num+'e2')+'e-2').toFixed(precision);
		else
			return Number(Math.round(num+'e2')+'e-2');
	}
});