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

		this.hasHash = false;

		this.templater = args.templater;

		if( args && args.template_data )
			this.template_data = args.template_data;

		if( args && args.dom )
			this.dom = args.dom;

		this.template_memo = {
			'$$item__' : this.cloneObject( this.template_data )
		};

		this.template_main = this.cloneObject( this.template_data );

		this.deep( this.template_memo, "", "" );

		this.template_hash = this.ends;

		this.template_hdom = {};

	},

	cloneObject : function( obj ){
	    if (obj === null || typeof obj !== 'object' || obj.template_data !== undefined)
	        return obj;

	    var temp = obj.constructor();
	    for (var key in obj)
	        temp[key] = this.cloneObject(obj[key]);

	    return temp;
	},

	deep : function( root, root_type, root_label ){
		var ends = {};

		for( var pp in root ){
			var el = root[ pp ], type_array = this.isarray( el ),
			type_object = this.isobject( el ), end = root_label + root_type + pp,
			type = type_array || type_object, react = this.template_data[ pp ];

			if( type ){

				if( type_array && react )
					this.lists[ end ] = react;

				this.deep( el, type, end );
			}else{
				this.hasHash = true;
				this.ends[ "{{"+end+"}}" ] = el;
				root[ pp ] = "{{"+end+"}}";
			}
		}

		return ends;
	},

	flat : function( root, root_type, root_label, ends ){

		if( root_type === undefined )
			root_type = "";

		if( root_label === undefined )
			root_label = "";

		if( ends === undefined )
			ends = {};

		for( pp in root ){
			var el = root[ pp ], type_array = this.isarray( el ),
			type_object = this.isobject( el ), end = root_label + root_type + pp,
			type = type_array || type_object;

			if( type ){
				this.flat( el, type, end, ends );
			}else{
				ends[ "$$item__." + end ] = el;
			}
		}

		return ends;
	},

	isobject : function( ob ){
		return ob ? ob.constructor.prototype === {}.constructor.prototype ? "." : "" : "";
	},

	isarray : function( ob ){
		return ob ?  ob.constructor.prototype === [].constructor.prototype ? "_" : "" : "";
	},

	track : function(){

		if( this.hasHash ){

			var tt = "", me = this;

			for( var index in this.template_hash ){
				var
					hash = this.template_hash[ index ],
					finds,
					domprops,
					finaldata = hash !== undefined ? (hash === "" ? '\n' : String(hash)) : '\n';

				hash = this.template_hash[ index ];
				if( hash === undefined ){
					hash = this.template_hash[ 'item' ];
					if( hash ){
						hash = "item";

						if( this.templater.__index !== undefined )
							hash = hash + '_' + this.templater.__index;
					}
				};

				if( this.dom ){
					if(!this.templater.debug){
						finds = findAndReplaceDOMText( this.dom , {
							find : index,
							replace : finaldata
						});
					}
					if(this.templater.debug){
						finds = this.findDoms(this.dom, {
							find: index,
							replace: finaldata
						});
					}
				}

				this.findInputs( this.dom );

				var hdom = this.template_hdom[ index ];
				if( hdom ){
					this.template_hdom[ index ] = this.template_hdom[ index ].concat( finds.doms );
				}else{
					this.template_hdom[ index ] = finds.doms;
				}
			}

			this.trackattr( [this.dom] );
		}
	},

	findDoms: function(dom, options) {
		var
			result = [],
			matches = findAndReplaceDOMText(dom, options).doms;

		if(matches.length){
			return matches.concat(this.findDoms(dom, options));
		}else{
			return result;
		}
	},

	trackattr : function( root ){

		var qtroot = root.length, dom, tt, children, qt, d, hash, clean, storeattr;
		while( qtroot-- ){
			dom = root[ qtroot ];
			children = dom.children;
			if(dom.attributes.length){
				tt = Array.prototype.slice.call(dom.attributes), qt=tt.length;
				while( qt-- ){
					d = tt[ qt ], hash = this.template_hash[ d.value ];
					if( typeof hash !== 'undefined' ){
						this.template_hdom[ d.value ].push( d );
						d.$$templatersolo = true;
						d.$$templatersoloowner = d.ownerElement;
						if( hash )
							d.value = hash;
						else
							d.ownerElement.removeAttribute( d.name );
					}else{
						clean = d.value.replace(/\"/gi,"");
						if( isNaN(clean.match(/\$\$item__./gi) * 1) ){
							storeattr = this.get_data( clean );
							d.$$templatersolo = true;
							d.ownerElement.setAttribute(d.name, d.value.replace(storeattr.track,storeattr.data));
							this.template_hdom[ "{{$$item__."+storeattr.index+"}}" ].push(d);
						}
					}
				}
			}
			this.trackattr( children );
		}
	},

	set_data : function(index_track,value,old_value,dom){
		var
		el = this.get_data(index_track),
		parent = this.templater.__parent,
		setData = {};

		if(el) {
			var
			levels = el.index.split("."),
			parentLevel = "";

			for(var qt = levels.length-1; qt > -1; qt-- ) {
				var
				json = {},
				level = levels[qt];

				json[ level ] = this.cloneObject(value);

				value = this.cloneObject(json);

				if(qt === levels.length-1) {
					setData = this.cloneObject(json);
				} else {
					setData = this.cloneObject(value);
				}
			};

			this.templater.setData(setData);
		}
	},

	get_data : function( index_track ){
		var
		indexes = index_track.replace(/(^.*\{|\}.*$)/g, '').split("."),
		data,
		count=1,
		end,
		index = "",
		parent = this.templater.__parent,
		track;

		indexes.splice(0,1);

		indexes = indexes.filter(function(n){ return n !== "" && n !== undefined && n !== null });

		end = indexes.length;

		// if( parent )
		// 	end = end - 1;

		for(var i in indexes){
			if( count++ <= end ){
				var inx = indexes[ i ] === "$$item" ? indexes[ i ] + "__": indexes[ i ];
				data = !data ? this.template_data[ inx ] : data[ inx ];
				index += indexes[ i ] + ".";
			}
		}

		index = index.slice(0,-1);

		track = index_track.split(" ").filter(function(t){ return t.match(/({{\$\$item__.)|(}})/gi) }).join();

		return {data: data, index: index, track: track};
	},

	getDataFromTrack: function(track) {
		var
			parts = [],
			objects = track.split('.');

		for(var part in objects)
			parts = parts.concat(objects[ part ].split('_'));

		return this.getDataFromTrackLoop(parts, this.template_main);
	},

	getDataFromTrackLoop: function(parts, value) {
		var index = parts.shift();

		if( value[index] ){
			if( parts.length )
				return this.getDataFromTrackLoop(parts, value[index]);
			else
				return value[index];
		}else{
			return undefined;
		}
	},

	getDomFromTrack: function(track) {
		var
			parts = [],
			objects = track.split('.');

		for(var part in objects)
			parts = parts.concat(objects[ part ].split('_'));

		return this.getDomFromTrackLoop(parts, this.template_memo.$$item__);
	},

	getDomFromTrackLoop: function(parts, value) {
		var index = parts.shift();

		if( value[index] ){
			if( parts.length )
				return this.getDomFromTrackLoop(parts, value[index]);
			else
				return this.template_hdom[ value[index] ];
		}else{
			return undefined;
		}
	},

	findInputs : function( dom ){
		var
		i=0,
		nodeName = dom.nodeName.toUpperCase(),
		isInput = nodeName.match(/INPUT|TEXTAREA/),
		inputs = dom && Array.prototype.slice.call(dom.querySelectorAll('input')),
		textareas = dom && Array.prototype.slice.call(dom.querySelectorAll('textarea')),
		inputs =  isInput ? [dom] : inputs.concat(textareas),
		qt = inputs.length;

		for( ;i < qt; i++ ){
			var
			input = inputs[i],
			hash = input.value,
			label = hash.split("|")[0],
			data,
			hdom;

			data = this.template_hash[label];
			if( data === undefined ){
				data = this.template_hash['item'];
				if( data ) hash = "item";
			}

			if(data !== undefined){
				if(this.templater.__index !== undefined)
					hash = hash + '_' + this.templater.__index;

				hdom = this.template_hdom[hash];

				input.$$templater = hash;

				if(hdom !== undefined){
					this.template_hdom[hash] = this.template_hdom[hash].concat(input);
				}else{
					this.template_hdom[hash] = [input];
				}

				this.mutationinput(this.template_hdom[ hash ], hash);

				input.value = data;
			}
		}
	},

	mutationdom : function( doms, hash ){
		var i = 0, qt = doms.length;

		for( ; i < qt ; i++ ){
			var
			dom = doms[ i ],
			MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
			observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) { });
			}),
			config = {attributes: true,childList: true,characterData: true};

			observer.observe(dom, config);

			this.mutation_hash[ hash ] = observer;
		}

	},

	muteKeyUp: function(e){
		var
		el = e.srcElement || e.target;
		this.set_data(el.$$templater,el.value,el.__olderValue,el);
	},

	muteKeyDown: function(e){
		var
		el = e.srcElement || e.target;
		el.__olderValue = el.value;
	},

	mutationinput : function(doms,hash){
		var
		i = 0,
		qt = doms.length,
		me = this,
		muteKeyUp = this.muteKeyUp.bind(this),
		muteKeyDown = this.muteKeyDown.bind(this);

		for(;i < qt;i++){
			var
			dom = doms[ i ];

			dom.$$templaterpointer = this.templater;

			dom.removeEventListener('keydown',muteKeyDown);
			dom.addEventListener('keydown',muteKeyDown);

			dom.removeEventListener('keyup',muteKeyUp);
			dom.addEventListener('keyup',muteKeyUp);
		}
	}

});
