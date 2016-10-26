var Requirer = Base.extend({

	Promise : undefined,

	owner : undefined,

	createfile : function( content ){

		eval.call(window, content);

		if( this.owner )
			this.owner.binds();
	},

	constructor : function( config ){

		if( config ){

			this.config = config;

			this.total = this.config.files.length;

			this.owner = this.config.owner;

			this.load();

			return this;
		}

		return false;
	},

	load : function(){
		var 
			me = this,
			files = me.config.files,
			count = 0;

		if( files !== undefined && files.length ){

			this.Promise = new Promise(function(resolve, reject){
				
				var temp = "";

				files.every(function(file){
					if( !window[file] ){

						// var sc = document.createElement('script');

						// sc.src = me.config.url + '/' + file;

						// sc.onload = function(e){

						// 	count++;
						// 	if( count === me.total )
						// 		resolve();
						// };

						// document.head.appendChild( sc );

						var ajax = new Ajax({
							url : me.config.url + '/' + file,
							responseType : 'text',
							headers : {
								'Content-Type' : 'application/javascript'
							}
						});

						ajax.Promise.then(function( text ){

							count++;
							temp += text;
							if( count == me.total )
								resolve(temp);
						});

						return true;

					}else{

						if( me.owner ){
							
							me.owner.binds();

							return false;
						}
					}
				});
			});

			this.Promise
				.then(this.createfile.bind(this));
		}
	},
});