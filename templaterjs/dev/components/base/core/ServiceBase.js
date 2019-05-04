var ServiceBase = Templater.extend({

	type: 'ServiceBase',

	url: '',

	responses: null,

	model: {
		headers: {'Authorization': StorageManager.get('igocredentialstoken')},
		url: function() {
			var url = this.url;
			return url;
		}
	},

	success: function() {},

	constructor: function(cf) {
		if (cf) {
			if(cf.success)
				this.success = cf.success;

			if(cf.responses && typeof cf.responses === "object")
				this.responses = cf.responses;

			if(cf.url)
				this.url = cf.url;
		}
		this.base.call(this, cf);
	},

	get: function(data) {
		if(!data && this.template_data)
			data = this.template_data;
		this.register('get',data,this.responses && this.responses.get);
	},

	post: function(data) {
		if(!data && this.template_data)
			data = this.template_data;
		this.register('post',data,this.responses && this.responses.post);
	},

	put: function(data) {
		if(!data && this.template_data)
			data = this.template_data;
		this.register('put',data,this.responses && this.responses.put);
	},

	delete: function(data) {
		if(!data && this.template_data)
			data = this.template_data;
		this.register('delete',data,this.responses && this.responses.delete);
	},

	register: function(type, data, callback) {
		var
		id = GlobalContext.uuid(),
		url = typeof this.url === "function" ? this.url() : this.url;
		ServiceBaseManager.register(
			this.exec.bind(this,type,data,callback,id),
			callback || this.success.bind(this),
			id, {
				url: url,
				type: this.type
			}
		);
	},

	proxyUrlParams: function(url) {
		for(var index in this.template_data) {
			var
			property = '/:' + index.toString().toLowerCase(),
			value = this.template_data[index] || "",
			regexp = new RegExp(property,'gi'),
			match = url.match(regexp);

			if(match)
				url = url.replace(property,'/'+value);
		}
		return url;
	},

	exec: function(type, data, callback,id) {
		if(this.responseType && this.responseType !== "json") {
			if(this.model && this.model.Ajax)
				this.model.Ajax.responseType = this.responseType;
		}
		this.model[type](
			this.response.bind(this,id),
			this.error.bind(this,id),
			data
		);
	},

	error: function(id,data,status,readyState) {
		if(status === 401) {
			GlobalContext.redoLogin();
			return;
		}
		this.response(id,data);
	},

	response: function(id,server_data) {
		ServiceBaseManager.response(id,server_data);
	}
});
