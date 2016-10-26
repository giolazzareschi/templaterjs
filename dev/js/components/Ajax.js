var Ajax = Base.extend({

	xhr : undefined,

	url : "",

	responseType : 'json',

	headers : {},

	request : function( resolve, reject ){
		this.xhr.open("GET", this.url, true);
		this.xhr.onreadystatechange = this.ready.bind( this, resolve, reject );
		for( header in this.headers )
			this.xhr.setRequestHeader(header, this.headers[ header ]);
		this.xhr.send();
	},

	get : function(){},

	owner : undefined,

	constructor : function( args ){
		if( args && args.url !== undefined ){
			
			this.url = args.url;

			this.xhr = new XMLHttpRequest();

			if( args.owner !== undefined )
				this.owner = args.owner;

			if( args.responseType !== undefined )
				this.responseType = args.responseType;

			if( args.get !== undefined )
				this.get = args.get.bind( this.owner );

			if( args.error !== undefined )
				this.error = args.error.bind( this.owner );

			if( args.headers !== undefined )
				this.headers = args.headers;

			this.Promise = new Promise(this.request.bind(this));
		}
	},

	ready : function( resolve, reject ){
		if( this.xhr.status === 200 && this.xhr.readyState === 4 ){
			var resp = this.xhr.responseText;

			if( this.responseType === 'json' )
				resp = JSON.parse( this.xhr.responseText );

			resolve( resp );
		}
	}

});