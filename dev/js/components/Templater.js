var Templater = Base.extend({

	template : '',

	template_data : undefined,

	child_template : undefined,

	dom : undefined,

	hasChild : false,

	events : {},

	buffer_rollback : undefined,

	parent : undefined,

	model : undefined,

	autopaint : false,

	binder : {},

	items : {},

	type : 'Templater',

	isList : false,

	isListItem : false,

	debug : false,

	model : undefined,

	require : undefined,

	listenpaint : function(){		
		// this.setpushpop(this.template_data, "", "");
		this.watch();
	},

	watch : function(){
		this.changes_timer = setInterval( this.changes.bind(this), 60 );
	},

	changes_timer: undefined,

	changes : function(){
		if( JSON.stringify( this.template_data ) !== JSON.stringify( this.binder.template_main ) ){
			clearInterval( this.changes_timer );
			this.deepfind( this.template_data, null, "", "", this.binder.template_main );
		}
	},

	setData : function( data ){
		if( JSON.stringify( data ) !== JSON.stringify( this.binder.template_main ) ){
			clearInterval( this.changes_timer );
			this.changes_timer = setTimeout( this.deepfind.bind( this, data, null, "", "", this.binder.template_main ) , 1500 );
		}
	},

	deepfind : function( where, binder_temp, token, root_label, main_data ){
		if( token === undefined ) token = "";

		var binder = this.binder;

		for( var p in where ){
			var original = where[ p ],
			isarray = binder.isarray( original ),
			main_ = main_data[ p ],
			clean = isarray || binder.isobject( original ), 
			track = token + p + clean;

			if( !clean ){

				if( original !== main_ ){

					var dom = this.binder.template_hdom["$$item__." + track], dom_;

					if( !dom || !dom.length ){
						dom = this.items[ p ];
						if( dom && dom.__parent !== undefined )
							dom = dom.binder.template_hdom['item_' + p];
					}

					if( dom !== undefined && dom.length > 0 ){
						for(dd in dom){
							dom_ = dom[ dd ];

							if( dom_.$$templatersolo ){
								var ownerref = dom_.$$templatersoloowner;
								if( original ){
									ownerref.setAttributeNode( dom_ );
								}else{
									ownerref.removeAttribute( dom_.name );
								}

								ownerref[dom_.name] = original;
							}else{
								if( dom_.ownerElement !== undefined )
									dom_  = dom_.ownerElement;
								
								if( dom_.value !== undefined )
									dom_.value = original;

								if( dom_.textContent !== undefined )
									dom_.textContent = original;
							}
						}
					}

					this.react({
						changed : track,
						dom : dom_,
						from : main_,
						to : original
					});

					this.update_original( track, this.binder.template_main, where );

					this.update_original( track, this.template_data, where );
					
					var hashash = this.binder.template_hash['$$item__.' + track];
					if( hashash !== undefined )
						this.binder.template_hash['$$item__.' + track] = original;

					this.binder.track();

					break;
				}
			}else{

				if( binder.isarray( main_ ) ){
					if( main_.length !== original.length ){
						this.binder.template_main = binder.cloneObject( this.template_data );

						break;
					}
				}

				binder_ = binder_temp ? binder_temp[p] : binder.template_main[p];

				this.deepfind( original, binder_, track, p, main_ );
			}
		}

		if( this.autopaint )
			this.watch();

		return {};
	},

	update_original : function(track, original, news){
		var olevels = track.split("."), i = 0, qt = 0, level, original_ = original, news_ = news;
		
		olevels = olevels.filter(function(n){ return n !== "" && n !== undefined && n !== null && n !== "$$item__" });

		qt = olevels.length;

		for( ; i < qt ; i++ ){
			level = olevels[ i ];
			if( isNaN(level.match(/[_][0-9]+$/gi)*1) ){								
				var index = level.split("_");
				news_ = news_[ index[0] ][index[1]];
				original_ = original_[ index[0] ][index[1]];
			}else{
				var inside = typeof original_[ level ];
				if( inside === typeof {} ){
					var tt = track.split('.');					
					for( var x = i; x > -1; x-- )
						tt.splice(x,1);
					this.update_original(tt.join('.'), original_[level], news_[level]);
					news_ = news[ level ];
					original_ = original[ level ];
				}else{
					if( original_[ level ] !== undefined && news_[ level ] !== undefined )
						original_[ level ] = news_[ level ];
					if( original_[ level ] === undefined && news_[ level ] !== undefined )
						original_[ level ] = news_[ level ];
				}
			}
		}
	},

	setpushpop : function( where, token, root_label ){
		if( token === undefined ) token = "";

		var binder = this.binder;		

		for( var p in where ){
			var original = where[ p ],
			isarray = binder.isarray( original ),
			clean = isarray || binder.isobject( original ), 
			track = token + p + clean;

			if( typeof original === "function ") continue;

			if( clean && isarray ){
				if( original.$$pushpop === undefined ){
					original.$$pushpop = +new Date;
					original.pop = this.pop_.bind(this, original, track.slice(0, -1));
					original.push = this.push_.bind(this, original, track.slice(0, -1));
				}
			}

			if( clean === "" && isarray === "" ) break;

			this.setpushpop( original, track, p );
		}
	},

	pop_ : function( array_, track_id, index ){

		this.items = this.reindex( this.items );

		index = index === undefined || index === null ? array_.length-1 : index;
		
		array_.splice(index, 1);

		this.removed_data(track_id, index);
	},

	push_ : function( array_, track_id, item, index ){

		this.items = this.reindex( this.items );

		index = index === undefined || index === null ? array_.length : index;
		
		array_.splice(index, 0, item);

		this.added_data(track_id, item, index);
	},

	removed_data : function( track_id, index ){
		
		var item = this.items[ index ];
		
		item.dom.parentNode.removeChild( item.dom );

		delete this.items[String(index)];

		this.items = this.reindex( this.items );

		this.binder.template_main = this.binder.cloneObject( this.template_data );	
	},

	added_data : function( track_id, item, index ){
		if( this.isList && this.isList === true ){
			var typed = window[ this.type + 'Item' ], instance;
			if( typed ){
				instance = new typed({ 
					__parent : this,
					__index : index * 1,
					template_data : item || {}
				});

				instance.append( this.dom, index );
				
				var total=0	, newitems={};
				for( i in this.items ){ total++ };

				for( x=0; x < total; x++ ){
					if( x !== index ){
						if( x < index )
							newitems[ x ] = this.items[ x ];
						else
							newitems[ x+1 ] = this.items[ x ];
					}else{
						newitems[ x ] = instance;				
						newitems[ x+1 ] = this.items[ x ];
					}
				}

				if( x === 0 ) newitems[ 0 ] = instance;

				if( index === total ) newitems[ index ] = instance;
			}
		}

		this.items = newitems;

		this.items = this.reindex( this.items );

		this.binder.template_main = this.binder.cloneObject( this.template_data );	
	},

	reindex : function( items ){
		var count = 0, new_items = {};
		for( var index in items ){
			var item = items[ index ];
			item.__index = count;
			new_items[ count ] = item;
			count++;
		}
		return new_items;
	},

	react : function( data ){
		var reacto = function(){};

		if( this.reactions ){
			reacto = this.reactions[ data.changed ];
			if( reacto )
				reacto.apply( this, [data.dom, data.from, data.to] );
		}
	},

	constructor : function( args ){
		if( this.type === undefined ){
			throw "Type for Class needed.";
		}else{
			this.items = {};

			if( this.template_data === undefined )
				this.template_data = {};

			if( args && args.template !== undefined && args.template !== '' )
				this.template = args.template;

			if( args && args.binds !== undefined )
				this.binds = args.binds;

			if( args && args.__parent !== undefined )
				this.__parent = args.__parent;

			if( args && args.__index !== undefined )
				this.__index = args.__index;

			if( args && args.template_data !== undefined )
				this.template_data = args.template_data;

			if( args && args.events !== undefined )
				this.events = args.events;

			if( args && args.parent !== undefined )
				this.parent = args.parent;
			
			if( this.isList )
				if( this.template_data !== undefined )
					this.create_items(this);

			if( args && args.model !== undefined ){
				args.model.owner = this;
				this.model = new Requester( args.model ); 
			}else if( this.model !== undefined ){
				this.model.owner = this;
				var temp = this.model;
				this.model = new Requester( temp );
			}

			if( this.template !== '' )
				this.update_dom();

			if( (args && args.autopaint) || this.autopaint ){
				this.autopaint = args && args.autopaint ? args.autopaint : true;
				this.listenpaint();
			}

			this.setpushpop(this.template_data, "", "");

			if( args && args.require !== undefined ){
				args.require.owner = this;
				this.require = new Requirer( args.require );
			}else if( this.require !== undefined ){
				this.require.owner = this;
				this.require = new Requirer( this.require );
			}
		}
	},

	create_items : function(parent){	
		var items = parent.template_data.items, model_name = parent.type + 'Item', model = window[model_name], cc = 0;

		model.prototype.type = model_name;
		model.prototype.isListItem = true;

		for( var i in items ){
			var tt = new model({
				__parent : parent,
				__index  : cc*1,
				template_data : items[ i ] || {}
			});

			parent.items[String(cc)] = tt;
			cc++;
		}
	},

	server_get : function(){		
		
	},

	hbs : function(){
		this.update_child_template();
		// var tpl = !this.autopaint ? this.template_data : (this.binder.template_memo["$$item__"] || this.binder.template_memo);
		var tpl = this.binder.template_memo["$$item__"] || this.binder.template_memo;
		return Handlebars.compile( this.template )( tpl );
	},

	binds : function(){
		
	},

	hide : function(){
		this.dom.classList.add("hide");
	},

	show : function(){
		this.dom.classList.remove("hide");
	},

	update_dom : function( rollback_dom ){

		var binder = new Binder({
			templater : this,
			template_data : this.template_data
		});
		this.binder = binder;

		if( !rollback_dom ){
			var dom = document.createElement('div');
			dom.innerHTML = this.hbs();
			this.dom = dom.children[0];
		}else{
			this.dom = rollback_dom;
			this.buffer_rollback = undefined;
		}

		this.get_template_elements();

		this.binder.dom = this.dom;
		this.binder.track();
		
		for( index in this.items ){
			this.items[ index ].append( this.dom );
		}
		
		if( !this.require )
			this.binds();

		for( p in this.events )
			this.register_events(p, this.events[p]);
	},

	factory : function( proto ){
		var t = proto.data[0];

		var o = new proto.pattern({
			template_data : t
		});

		o.append( proto.renderdom );
	},

	update_child_template : function(){
		if( this.child_template !== undefined ){
			for( tpl in this.child_template )
				this.template_data[ tpl ] = Handlebars.compile(this.child_template[ tpl ])(this.template_data);		
		}
	},

	get_dom : function(){
		var dom = document.createElement('div');

		dom.innerHTML = this.hbs();

		return dom.children[0];
	},

	get_template_elements : function( dom ){
		if( this.dom ){
			var dom = dom !== undefined ? dom : this.dom, elements = dom.querySelectorAll('*[id]'), i=0, qt = elements.length;			
			for( ; i < qt; i++ ){
				var element = elements[ i ];
				if( this.elements === undefined )
					this.elements = {};

				try{
					this.elements[ element.id ] = element;
				}catch(e){};
			}
		}
	},

	register_events : function(property, fn, dom){
		var data = property.split(' '), event = data[0], selector = data.splice(1).join(' ').trim(), dom = dom !== undefined ? dom : this.dom;
		try{
			if( selector ){
				var dd = dom.querySelectorAll( selector );
				for(var i=0, qt=dd.length; i<qt; i++)
					dd[ i ].addEventListener(event, fn.bind(this), !1);

			}else{
				if( event ){
					dom.addEventListener(event, fn.bind(this), !1);					
				}
			}
		}catch(e){
			console.log( selector );
			console.log( e );
		};
	},

	render : function( receiver ){
		this.receiver = receiver;
		receiver.innerHTML = "";
		receiver.appendChild( this.dom );
	},

	append : function( receiver, index ){
		if( index === undefined ){
			this.receiver = receiver;		
			receiver.appendChild( this.dom );
		}else{
			var sib = receiver.children[ index ];
			this.receiver = receiver;
			this.receiver.insertBefore( this.dom, sib );
		}
	},

	clear : function( receiver ){
		this.receiver = receiver;	
		this.receiver.innerHTML = "";
	},

	repaint : function(){
		this.buffer_rollback = this.dom.cloneNode(true);
		var temp_dom = this.get_dom();
		this.dom.parentNode.replaceChild( temp_dom, this.dom );
		this.dom = temp_dom;
		this.get_template_elements();

		for( p in this.events )
			this.register_events(p, this.events[p], this.dom);

		this.binds();		
	},

	rollback : function(){
		if( this.buffer_rollback ){
			this.update_dom( this.buffer_rollback );
			this.receiver.innerHTML = "";
			this.receiver.appendChild( this.dom );
		}
	},

	remove : function(){
		this.dom.parentNode.removeChild( this.dom );		
	},

	destroy : function(){

		if( this.dom.parentNode )
			this.dom.parentNode.removeChild( this.dom );
		
		delete this;
	}

},{ deeping_ : false });