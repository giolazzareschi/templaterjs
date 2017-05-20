var RequesterAjax = Base.extend({

	url : '',

	data : {},

	owner : undefined,

	constructor : function( config ){

		if( config ){

			if( config.owner !== undefined )
				this.owner = config.owner;

			if( config.url !== undefined ){
				if( typeof config.url === 'function' ){
					this.url = config.url.call( this.owner );
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

		var params, url = this.url;
		if(payload){
			params = Object.keys(payload).map(function(k) {
			    return encodeURIComponent(k) + '=' + encodeURIComponent(payload[k])
			}).join('&');

			if( typeof this.url === 'function' ){
				this.url = this.url.call( this.owner || this.owner ); 
			}

			url = this.url + '?' + params;
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
			payload = payload ? JSON.stringify(payload) : JSON.stringify(this.owner.template_data),
			config = {
				method: 'POST',
				url: this.url,
				data: payload !== "{}" ? payload : null,
				success: success.bind(this.owner),
				error: error.bind(this.owner),
				headers: this.headers,
				owner: this.owner
			};

		this.__request__(config);
	},


	put : function(success, error, payload){
		
		var 
			payload = payload ? JSON.stringify(payload) : JSON.stringify(this.owner.template_data),
			config = {
				method: 'PUT',
				url: this.url,
				data: payload !== "{}" ? payload : null,
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
			config = {
				method: 'DELETE',
				url: this.url,
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