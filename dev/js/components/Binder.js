var Binder = Base.extend({

	template_data : {},

	template_main : {},

	template_memo : {},

	template_hash : {},

	template_hdom : {},

	mutation_hash : {},

	dom : undefined,

	lists : {},

	observers : [],

	ends : {},

	templater : undefined,

	constructor : function( args ){

		this.ends = {};

		this.templater = args.templater;

		if( args && args.template_data )
			this.template_data = args.template_data;

		if( args && args.dom )
			this.dom = args.dom;		

		this.template_memo = this.cloneObject( this.template_data );

		this.template_main = this.cloneObject( this.template_data );		

		this.deep( this.template_memo, "", "" );

		this.template_hash = this.ends;

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
		var ends = {};

		for( pp in root ){
			var el = root[ pp ], type_array = this.isarray( el ), 
			type_object = this.isobject( el ), end = root_label + root_type + pp, 
			type = type_array || type_object, react = this.template_data[ pp ];
			
			if( type ){
				
				if( type_array && react )
					this.lists[ end ] = react; 

				this.deep( el, type, end );
			}else{
				this.ends[ end ] = el;
				root[ pp ] = end;
			}
		}

		return ends;
	},

	isobject : function( ob ){
		return ob.constructor.prototype === {}.constructor.prototype ? "." : "";
	},

	isarray : function( ob ){
		return ob.constructor.prototype === [].constructor.prototype ? "_" : "";
	},

	track : function(){

		var tt = "";

		for( index in this.template_hash ){
			var hash = this.template_hash[ index ], finds, domprops, finaldata = hash ? String(hash) : '\b';

			hash = this.template_hash[ index ];
			if( !hash ){
				hash = this.template_hash[ 'item' ];
				if( hash ){
					hash = "item";

					if( this.templater.__index !== undefined )
						hash = hash + '_' + this.templater.__index;
				}
			};
			
			finds = findAndReplaceDOMText( this.dom , {
				find : index,
				replace : finaldata
			});

			// domprops = [].slice.call( this.dom.querySelectorAll('[value="'+ index +'"]') );

			this.findInputs( this.dom );

			hdom = this.template_hdom[ index ];
			if( hdom ){
				this.template_hdom[ index ] = this.template_hdom[ index ].concat( finds.doms );
			}else{
				this.template_hdom[ index ] = finds.doms;
			}

			// if( domprops.length > 0 ){
			// 	for( dp in domprops ) domprops[ dp ].value = finaldata;
			// 	this.template_hdom[ index ] = this.template_hdom[ index ].concat( domprops );
			// }

			this.mutationdom( this.template_hdom[ index ], index );

			this.template_hdom[ index ].forEach(function(el){
				if( el.$$templater === undefined ){
					el.$$templater = index;
				}
			});

		}

		var dom = this.dom, children = this.dom.children, i = 0, qt = children.length;
		for( ; i < qt ; i++ ){
			var child = children[ i ];

			var ss = Array.prototype.slice.call(child.attributes);
			if( ss !== undefined && ss.length > 0 ){
				var i=0 , qt = ss.length; 
				for( ; i<qt; i++ ){
					var d = ss[ i ], hash = this.template_hash[ d.value ];
					if( d && hash ){
						this.template_hdom[ d.value ].push( d );
						d.value = hash;
					}
				}	
			}
		}

		var tt = Array.prototype.slice.call(dom.attributes);
		if( tt !== undefined && tt.length > 0 ){
			var i=0 , qt = tt.length; 
			for( ; i<qt; i++ ){
				var d = tt[ i ], hash = this.template_hash[ d.value ];
				if( d && hash ){
					this.template_hdom[ d.value ].push( d );
					d.value = hash;
				}
			}
		}
	},

	findInputs : function( dom ){
		var inputs = dom.querySelectorAll('input'), i=0, qt=inputs.length;
		for( ;i < qt; i++ ){
			var input = inputs[ i ] , hash = input.value, label = hash.split("|")[0],
			data, hdom;

			data = this.template_hash[ label ];
			if( !data ){
				data = this.template_hash[ 'item' ];
				if( data ) hash = "item";
			}

			if( data ){
				if( this.templater.__index !== undefined )
					hash = hash + '_' + this.templater.__index;

				hdom = this.template_hdom[ hash ];
				
				input.$$templater = hash;

				if( hdom !== undefined ){					
					this.template_hdom[ hash ] = this.template_hdom[ hash ].concat( input );
				}else{
					this.template_hdom[ hash ] = [input];
				}

				this.mutationinput( this.template_hdom[ hash ], hash );

				input.value = data;
			}
		}
	},

	mutationdom : function( doms, hash ){
		var i = 0, qt = doms.length;

		for( ; i < qt ; i++ ){
			var dom = doms[ i ]
			, MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
			, observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) { }); })

			, config = { attributes: true, childList: true, characterData: true };

			observer.observe(dom, config);

			this.mutation_hash[ hash ] = observer;
		}
		 
	},

	set_data : function( index_track, value ){
		var el = this.get_data( index_track ), parent = this.templater.__parent;

		if( parent )
			parent.template_data.items[this.templater.__index] = value;
		else
			this.template_data[ el.index ] = value;
	},

	get_data : function( index_track ){
		var indexes = index_track.split(/[\.]|\_/), data, count=1, end = indexes.length, index;

		for(var i in indexes){
			if( count++ <= end )
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