var Binder = Base.extend({

	template_data : {},

	template_memo : {},

	template_hash : {},

	template_hdom : {},

	dom : undefined,

	ends : [],

	constructor : function( args ){

		if( args && args.template_data )
			this.template_data = args.template_data;

		if( args && args.dom )
			this.dom = args.dom;

		this.template_memo = this.cloneObject( this.template_data );

		this.template_hash = this.deep( this.template_memo, "", "" );

		this.template_hdom = {};

	},

	cloneObject : function( obj ){
	    if (obj === null || typeof obj !== 'object')
	        return obj;
	 
	    var temp = obj.constructor();
	    for (var key in obj)
	        temp[key] = this.cloneObject(obj[key]);
	 
	    return temp;		
	},

	deep : function( root, root_type, root_label ){

		for( pp in root ){
			var el = root[ pp ], type = this.isArray( el ) || this.isObject( el ), end = root_label + root_type + pp;
			
			if( type ){
				end += this.deep( el, type, end );
			}else{
				this.ends[ end ] = el;
				root[ pp ] = end;
			}
		}

		return this.ends;
	},

	isObject : function( ob ){
		return ob.constructor.prototype == {}.constructor.prototype ? "." : "";
	},

	isArray : function( ob ){
		return ob.constructor.prototype == [].constructor.prototype ? "_" : "";
	},

	track : function(){
		for( index in this.template_hash ){
			var hash = this.template_hash[ index ],
			finds = findAndReplaceDOMText( this.dom , {
				find : index,
				replace : this.template_hash[ index ]
			});

			this.findInputs( this.dom );

			hdom = this.template_hdom[ index ];
			if( hdom ){
				this.template_hdom[ index ] = this.template_hdom[ index ].concat( finds.doms );
			}else{
				this.template_hdom[ index ] = finds.doms;
			}

			this.template_hdom[ index ].forEach(function(el){
				if( el.$$templater === undefined ){
					el.$$templater = index;
				}
			});

		}
	},

	findInputs : function( dom ){
		var inputs = dom.querySelectorAll('input'), i=0, qt=inputs.length;
		for( ;i < qt; i++ ){
			var input = inputs[ i ] , hash = input.value, label = hash.split("|")[0],
			data = this.template_hash[ label ], hdom;

			if( data ){
				hdom = this.template_hdom[ hash ];
				
				input.$$templater = hash;

				if( hdom !== undefined ){
					this.template_hdom[ hash ].push( input );
				}else{
					this.template_hdom[ hash ] = [input];
				}

				input.value = this.template_hash[ label ];
			}
		}
	}

});