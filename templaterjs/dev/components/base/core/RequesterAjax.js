var RequesterAjax = Base.extend({

	data : {},

	owner : undefined,

	constructor : function( config ){
		this.url = "";

		if( config ){

			if( config.owner !== undefined )
				this.owner = config.owner;

			if( config.url !== undefined ){
				if( typeof config.url === 'function' ){
					// this.url = config.url.call( this.owner );
					this['url'] = config.url;
				}
				else{
					this['url'] = config.url;
				}
			}

			if( config.header !== undefined ){
				this.headers = config.headers;
			}
		}

		this.Ajax = new Ajax({
			url: this.url,
			headers: this.headers,
			owner: this.owner
		});

		this.base.call(this, config);
	},

	get : function(success, error, payload){

		var
		params,
		url = (typeof this.owner.url === 'function') ? this.owner.url.call( this.owner, payload ) : this.owner.url,
		payload = Templater.cloneObject(payload);

		url = this.owner.proxyUrlParams(url, this.owner.template_data);

		delete payload.__$$templaterId;

		if(payload){
			params = Object.keys(payload).map(function(k) {
				var
				content = payload[k];
				if(typeof content === 'object')
					content = JSON.stringify(content);
				return encodeURIComponent(k) + '=' + encodeURIComponent(content);
			}).join('&');

			url = url + '?' + params;
		}

		var
		payload = payload ? JSON.stringify(payload) : JSON.stringify(this.owner.template_data),
		config = {
			method: 'GET',
			url: url,
			data: null,
			success: success.bind(this.owner),
			error: error.bind(this.owner),
			headers: this.headers,
			owner: this.owner
		};

		this.__request__(config);
	},

	post : function(success, error, payload){

		var
		payloadToSend = payload ? JSON.stringify(payload) : JSON.stringify(this.owner.template_data),
		payloadToSend = this.owner.formData ? payload : payloadToSend,
		url = typeof this.url === 'function' ? this.url.call( this.owner, payload ) : this.url,
		config = {
			method: 'POST',
			url: url,
			data: payloadToSend !== "{}" ? payloadToSend : null,
			success: success.bind(this.owner),
			error: error.bind(this.owner),
			headers: this.headers,
			owner: this.owner
		};

		this.__request__(config);
	},


	put : function(success, error, payload){

		var
		payloadToSend = payload ? JSON.stringify(payload) : JSON.stringify(this.owner.template_data),
		payloadToSend = this.owner.formData ? payload : payloadToSend,
		url = typeof this.url === 'function' ? this.url.call( this.owner, payload ) : this.url,
		config = {
			method: 'PUT',
			url: url,
			data: payloadToSend !== "{}" ? payloadToSend : null,
			success: success.bind(this.owner),
			error: error.bind(this.owner),
			headers: this.headers,
			owner: this.owner
		};

		this.__request__(config);
	},

	delete : function(success, error, payload){

		var
		payload = payload ? JSON.stringify(payload) : JSON.stringify(this.owner.template_data),
		url = typeof this.url === 'function' ? this.url.call( this.owner, payload ) : this.url,
		config = {
			method: 'DELETE',
			url: url,
			data: payload !== "{}" ? payload : null,
			success: success.bind(this.owner),
			error: error.bind(this.owner),
			headers: this.headers,
			owner: this.owner
		};

		this.__request__(config);
	},

	__request__: function( config ) {
		config = this.interceptJWT(config);

		this.Ajax.request(config);
	},

	interceptJWT: function(config) {
		if(GlobalContext.hasAuthenticationToken() && this.headers !== false){
			if(!config.headers)
				config.headers = {};

			config.headers['Authorization'] = GlobalContext.getAuthorizationToken();
		}

		return config;
	}

});
