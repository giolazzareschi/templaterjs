var Ajax = Base.extend({

	constructor : function( args ){

		this.xhr = undefined;
		this.url = "";
		this.responseType = 'json';
		this.headers = {};
		this.data = null;

		if( args && args.url !== undefined ){

			this.xhr = new XMLHttpRequest();

			if( args.url !== undefined )
				this.url = args.url;

			if( args.owner !== undefined )
				this.owner = args.owner;
		}
	},

	_fetch_response: function(success,error,response) {
		response['json']().then(success,error);
	},

	requestWithFetch: function(config) {
		var
		url = "",
		data = {
			method: config.method
		};

		config.headers['Content-Type'] = 'application/json';
		config.headers['Accept'] = 'application/json';
		data['headers'] = new Headers( config.headers );

		if(config.url !== undefined){
			if( typeof config.url === 'function' ){
				url = config.url.call( config.owner );
			}else{
				url = config.url;
			}
		}

		window.fetch(url, data)
			.then(this._fetch_response.bind(this, config.success, config.error))
	},

	request : function( config ){
		if(config.method === "GET" && window.fetch !== undefined) {
			// this.requestWithFetch(config);
			this.requestWithAjax(config);
		}else{
			this.requestWithAjax(config);
		}
	},

	requestWithAjax: function(config) {
		var
		error = config.error ? config.error : function() {},
		success = config.success ? config.success : function() {},
		url ;

		if( config.url !== undefined ){
			if( typeof config.url === 'function' ){
				url = config.url.call( this.owner || config.owner, JSON.parse(config.data) );
			}
			else{
				url = config.url;
			}
		}

		this.xhr.open(config.method || 'GET', url, true);
		this.xhr.onreadystatechange = this.ready.bind( this, success, error );
		
		if(this.owner.formData) {
			// this.xhr.setRequestHeader('Accept', 'application/json');
		} else if(config.headers !== false){
			this.xhr.setRequestHeader('Accept', 'application/json');
			this.xhr.setRequestHeader('Content-Type', 'application/json');
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}

		for( var header in config.headers )
				this.xhr.setRequestHeader(header, config.headers[ header ]);

		this.xhr.send(config.data);
	},

	ready : function( success, error ){
		if( this.xhr.readyState === 4 ){
			if( this.xhr.status === 200 ){
				var
				resp = this.xhr.responseText;

				if(this.responseType === 'json')
					resp = JSON.parse(this.xhr.responseText);
				else if(this.responseType === "text")
					resp = this.xhr.response;

				success( resp );
			}else{
				if(this.xhr.status === 401)
					GlobalContext.restartApp();
				var
				resp = this.xhr.responseText;
				try {
					resp = JSON.parse(this.xhr.responseText);
				}catch(e) {}
				error(resp, this.xhr.status, this.xhr.readyState);
			}
		}
	}

});
