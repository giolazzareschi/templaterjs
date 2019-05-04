var StorageManager = Base.extend({

	type: 'StorageManager',

	storage: undefined,

	constructor: function() {
		this.storage = this.getStorage();
		this.base.call(this, arguments);
	},

	getStorage: function() {
		return window.localStorage;
	},

	set: function(hash, data) {
		return this.storage.setItem(hash, data);
	},

	get: function(hash) {
		return this.storage.getItem(hash);
	},

	remove: function(hash) {
		this.storage.removeItem(hash);
	}

}, {
	storage: window.localStorage,

	set: function(hash, data) {
		return this.storage.setItem(hash, data);
	},

	get: function(hash) {
		return this.storage.getItem(hash);
	},

	remove: function(hash) {
		this.storage.removeItem(hash);
	}
});