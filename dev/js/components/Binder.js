var Binder = Base.extend({

	template_data : {},

	template_main : {},

	template_memo : {},

	template_hash : {},

	template_hdom : {},

	mutation_hash : {},

	dom : undefined,

	ends : {},

	lists : {},

	observers : [],

	constructor : function( args ){

		if( args && args.template_data )
			this.template_data = args.template_data;

		if( args && args.dom )
			this.dom = args.dom;		

		this.template_memo = this.cloneObject( this.template_data );

		this.template_main = this.cloneObject( this.template_data );

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
			var el = root[ pp ], type_array = this.isarray( el ), 
			type_object = this.isobject( el ), end = root_label + root_type + pp, 
			type = type_array || type_object, react = this.template_data[ pp ];
			
			if( type ){
				
				if( type_array && react)
					this.lists[ end ] = react; 

				end += this.deep( el, type, end );
			}else{
				this.ends[ end ] = el;
				root[ pp ] = end;
			}
		}

		return this.ends;
	},

	isobject : function( ob ){
		return ob.constructor.prototype === {}.constructor.prototype ? "." : "";
	},

	isarray : function( ob ){
		return ob.constructor.prototype === [].constructor.prototype ? "_" : "";
	},

	get_data : function( index_track ){
		var indexes = index_track.split(/[\.]|\_/), last = this.template_data[ indexes[ 0 ] ], data = {}, dlast = indexes.length-2;

		for( var i=1, qt = indexes.length; i < qt; i++ ){			
			last = last[ indexes[ i ] ];
			if( i === dlast ){
				data.array_index = i-1;
				data.parent = last;
			}
		}

		data.data = last;

		return data;
	},

	track : function(){
		for( index in this.template_hash ){
			var hash = this.template_hash[ index ],
			finds = findAndReplaceDOMText( this.dom , {
				find : index,
				replace : String(this.template_hash[ index ])
			});

			this.findInputs( this.dom );

			hdom = this.template_hdom[ index ];
			if( hdom ){
				this.template_hdom[ index ] = this.template_hdom[ index ].concat( finds.doms );
			}else{
				this.template_hdom[ index ] = finds.doms;
			}

			this.mutationdom( this.template_hdom[ index ], index );

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
					this.template_hdom[ hash ] = this.template_hdom[ hash ].concat( input );
				}else{
					this.template_hdom[ hash ] = [input];
				}

				this.mutationinput( this.template_hdom[ hash ], hash );

				input.value = this.template_hash[ label ];
			}
		}
	},

	mutationdom : function( doms, hash ){
		var i = 0, qt = doms.length;

		for( ; i < qt ; i++ ){
			var dom = doms[ i ];

			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					
				});    
			});

			var config = { attributes: true, childList: true, characterData: true };

			observer.observe(dom, config);

			this.mutation_hash[ hash ] = observer;
		}
		 
	},

	mutationinput : function( doms, hash ){
		var i = 0, qt = doms.length, me = this;

		for( ; i < qt ; i++ ){
			var dom = doms[ i ];

			dom.addEventListener('change', function( e ){				
				var el = e.srcElement || e.target, data = me.get_data( el.$$templater );

				data.parent[ data.array_index ] = el.value;
			});
		}
		 
	}

});