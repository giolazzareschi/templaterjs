var ServiceBase = Templater.extend({

	type: 'ServiceBase',

	url: '',

	model: {
		headers: {'Authorization': GlobalContext.getAuthorizationToken()},
		url: function() {
			var url = this.url;
			if(typeof this.url === 'function')
				url = this.url();

			return url;
		}
	},

	success: function() {},

	constructor: function(cf) {
		if (cf) {
			if(cf.success)
				this.success = cf.success;

			if(cf.url)
				this.url = cf.url;
		}

		this.base.call(this, cf);
	},

	get: function(data) {
		this.register('get',data);
	},

	post: function(data) {
		this.register('post',data);
	},

	put: function(data) {
		this.register('put',data);
	},

	delete: function(data) {
		this.register('delete',data);
	},

	register: function(type, data) {
		ServiceBaseManager.register(this.exec.bind(this,type,data),this.success.bind(this));
	},

	exec: function(type, data) {
		this.model[type](this.response.bind(this), this.response.bind(this), data);
	},

	response: function(server_data) {
		ServiceBaseManager.response(server_data);
	}
});