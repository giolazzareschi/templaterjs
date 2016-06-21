var Ajax = Base.extend({

	xhr : undefined,

	url : "",

	responseType : 'json',

	get__ : function(){
		this.xhr.open("GET", this.url, true);
		this.xhr.onreadystatechange = this.ready.bind( this );
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

			if( args.get !== undefined )
				this.get = args.get.bind( this.owner );

			if( args.error !== undefined )
				this.error = args.error.bind( this.owner );
		}
	},

	ready : function(){
		if( this.xhr.status === 200 && this.xhr.readyState === 4 ){
			var resp = this.xhr.responseText;

			if( this.responseType === 'json' )
				resp = JSON.parse( this.xhr.responseText );

			this.get( resp );
		}
	}

});