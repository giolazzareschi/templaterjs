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

	set_data : function( index_track, value ){
		var el = this.get_data( index_track );

		el.data[ el.index ] = value;
	},

	get_data : function( index_track ){
		var indexes = index_track.split(/[\.]|\_/), data, count=1, end = indexes.length, index;

		for(var i in indexes){
			if( count++ < end )
				data = !data ? this.template_data[ indexes[ i ] ] : data[ indexes [ i ] ];			

			index = indexes[ i ];
		}

		return {data :data, index : index};
	},

	mutationinput : function( doms, hash ){
		var i = 0, qt = doms.length, me = this;

		for( ; i < qt ; i++ ){
			var dom = doms[ i ];

			dom.addEventListener('change', function( e ){				
				var el = e.srcElement || e.target

				me.set_data( el.$$templater, el.value );
			});
		}
		 
	}

});