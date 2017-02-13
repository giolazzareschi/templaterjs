var Requester = Base.extend({

	url : '',

	method : 'GET',

	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
	},

	body : '',

	data : {},

	response : 'json',

	owner : undefined,

	_onSuccess : function(response){

		return response[this.response]();
	},

	_onSuccessGET : function(success, fails, response){

		if(response.status === 401)
			GlobalContext.restartApp();
		else
			response[this.response]().then(success.bind(this.owner), fails.bind(this.owner));
	},

	_onSuccessPOST : function(success, fails, response){

		if(response.status === 401)
			GlobalContext.restartApp();
		else
			response[this.response]().then(success.bind(this.owner), fails.bind(this.owner));
	},

	_onError : function(response){

		return response[this.response]();
	},

	get : function(success, fails, data){		

		this.method = 'GET';

		this.data['method'] = this.method;

		if( typeof this.url === typeof function(){} )
			this.data['url'] = this.url.call( this.owner );
		else
			this.data['url'] = this.url;

		var hds = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

		var auth_token = GlobalContext.getAuthorizationToken();
		if( auth_token )
			hds['Authorization'] = auth_token;

		this.data['headers'] = new Headers( hds );

		delete this.data['body'];
		
		return this.fetch_get(success, fails);
	},

	post : function(success, fails, data){		

		this.method = 'POST';
		
		this.data['method'] = this.method;

		if( typeof this.url === typeof function(){} )
			this.data['url'] = this.url.call( this.owner );
		else
			this.data['url'] = this.url;

		var hds = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

		var auth_token = GlobalContext.getAuthorizationToken();
		if( auth_token )
			hds['Authorization'] = auth_token;

		this.data['headers'] = new Headers( hds );

		delete this.data['body'];

		if( data )
			this.data['body'] = JSON.stringify(data);
		else if( this.owner.template_data )
			this.data['body'] = JSON.stringify(this.owner.template_data);

		return this.fetch_post(success, fails);
	},

	constructor : function( config ){

		if( config ){

			if( config.method !== undefined ){
				this.method = config.method;
				this.data['method'] = this.method;
			}

			if( config.headers !== undefined ){
				this.headers = config.headers;
				this.data['headers'] = this.headers;
			}

			if( config.body !== undefined ){
				this.body = config.body;
				this.data['body'] = this.body;
			}

			if( config.response !== undefined ){
				this.response = config.response;
				this.data['response'] = this.response;
			}

			if( config.owner !== undefined )
				this.owner = config.owner;

			if( config.url !== undefined ){
				this.url = config.url;
				if( typeof this.url === typeof function(){} )
					this.data['url'] = this.url.call( this.owner );
				else
					this.data['url'] = this.url;
			}
		}

		this.base.call(this);
	},

	fetch_get : function(success, fails){
		if( !this.data.url )
			throw 'Url needed to make a Request.';

		return fetch(this.data.url, this.data).then(this._onSuccessGET.bind(this, success, fails));
	},

	fetch_post : function(success, fails){
		if( !this.data.url )
			throw 'Url needed to make a Request.';

		return fetch(this.data.url, this.data).then(this._onSuccessPOST.bind(this, success, fails));
	},

	fetch : function(){
		if( !this.data.url )
			throw 'Url needed to make a Request.';

		return fetch(this.data.url, this.data).then(this._onSuccess.bind(this));
	},

	cloneObject : function( obj ){
	    if (obj === null || typeof obj !== 'object')
	        return obj;
	 
	    var temp = obj.constructor();
	    for (var key in obj)
	        temp[key] = this.cloneObject(obj[key]);
	 
	    return temp;		
	}

});