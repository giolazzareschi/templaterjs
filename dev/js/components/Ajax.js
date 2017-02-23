var Ajax = Base.extend({

	xhr : undefined,

	url : "",

	responseType : 'json',

	headers : {},

	data: null,

	constructor : function( args ){
		if( args && args.url !== undefined ){

			this.xhr = new XMLHttpRequest();

			if( args.url !== undefined )
				this.url = args.url;
		}
	},

	request : function( config ){

		var
			error = config.error ? config.error : function() {},
			success = config.success ? config.success : function() {};

		this.xhr.open(config.method || 'GET', config.url || this.url, true);
		this.xhr.onreadystatechange = this.ready.bind( this, success, error );
		if(config.headers !== false){
			this.xhr.setRequestHeader('Accept', 'application/json');
			this.xhr.setRequestHeader('Content-Type', 'application/json');
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			for( header in config.headers )
				this.xhr.setRequestHeader(header, config.headers[ header ]);
		}
		this.xhr.send(config.data);
	},

	ready : function( success, error ){
		if( this.xhr.readyState === 4 ){
			if( this.xhr.status === 200 ){
				var resp = this.xhr.responseText;

				if( this.responseType === 'json' )
					resp = JSON.parse( this.xhr.responseText );

				success( resp );
			}else{
				if(this.xhr.status === 401)
					GlobalContext.restartApp();
				error(this.xhr.responseText, this.xhr.status, this.xhr.readyState);
			}
		}
	}

});