var Templater = Base.extend({

	template : '',

	template_data : {},

	child_template : undefined,

	dom : undefined,

	hasChild : false,

	events : {},

	buffer_rollback : undefined,

	parent : undefined,

	ajax : undefined,

	model : undefined,

	autopaint : false,

	binder : {},

	items : {},

	type : undefined,

	isList : false,

	isListItem : false,

	listenpaint : function(){		
		this.setpushpop(this.template_data, "", "");
		this.watch();
	},

	watch : function(){
		setInterval( this.changes.bind(this), 60 );
	},

	changes : function(){
		if( JSON.stringify( this.template_data ) !== JSON.stringify( this.binder.template_main ) ){
			this.deepfind( this.template_data, null, "", "", this.binder.template_main );
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
				
				if( !binder_temp )
					binder_temp = binder.template_main[p];

				if( original !== binder_temp[ p ] ){

					var dom = this.binder.template_hdom[track];

					if( !dom || !dom.length ){
						dom = this.items[ p ];
						if( dom && dom.__parent !== undefined )
							dom = dom.binder.template_hdom['item_' + p];
					}

					if( dom !== undefined && dom.length > 0 ){
						for(dd in dom){
							var dom_ = dom[ dd ];

							if( dom_.value !== undefined )
								dom_.value = original;

							if( dom_.textContent !== undefined )
								dom_.textContent = original;

							this.react({
								changed : p,
								where : root_label,
								dom : dom_
							});
						}
					}

					this.binder.template_main = binder.cloneObject( this.template_data );

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

		return {};
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


		this.removed_data(track_id, index)
	},

	push_ : function( array_, track_id, item, index ){
		this.items = this.reindex( this.items );

		index = index === undefined || index === null ? array_.length : index;
		
		array_.splice(index, 0, item);


		this.added_data(track_id, item, index)
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
					template_data : item
				});

				instance.append( this.dom );
				
				var i = undefined;
				for(i in this.items){};

				this.items[ ( i === undefined ? 0 : (i*1)+1) ] = instance;
			}
		}

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

		if( this.reactions )
			reacto = this.reactions[ data.where ];

		reacto.apply( this, [data.dom, data.where] );
	},

	constructor : function( args ){		
		if( this.type === undefined ){
			throw "Type for Class needed."
		}else{
			this.items = {};
			this.template_data = {};

			if( args && args.model !== undefined ){
				args.model.owner = this;
				this.ajax = new Ajax( args.model );
			}else if( this.model !== undefined ){
				this.model.owner = this;
				this.ajax = new Ajax( this.model );
			}

			if( args && args.template !== undefined && args.template !== '' )
				this.template = args.template;

			if( args && args.__parent !== undefined )
				this.__parent = args.__parent;

			if( args && args.__index !== undefined )
				this.__index = args.__index;

			if( args && args.template_data !== undefined )
				this.template_data.$$item__ = args.template_data;

			if( args && args.events !== undefined )
				this.events = args.events;

			if( args && args.parent !== undefined )
				this.parent = args.parent;
			
			if( this.isList )
				if( this.template_data.$$item__ !== undefined )
					create_items(this);

			if( this.template !== '' )
				this.update_dom();

			if( (args && args.autopaint) || this.autopaint ){
				this.autopaint = args && args.autopaint ? args.autopaint : true;
				this.listenpaint();
			}
		}
	},

	server_get : function(){		
		this.ajax.get__();
	},

	hbs : function(){
		this.update_child_template();		
		var tpl = !this.autopaint ? this.template_data : (this.binder.template_memo["$$item__"] || this.binder.template_memo);
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

		if( this.autopaint ){
			var binder = new Binder({
				templater : this,
				template_data : this.template_data
			});
			this.binder = binder;
		}

		if( !rollback_dom ){
			var dom = document.createElement('div');
			dom.innerHTML = this.hbs();
			this.dom = dom.children[0];
		}else{
			this.dom = rollback_dom;
			this.buffer_rollback = undefined;
		}

		this.get_template_elements();

		if( this.autopaint ){
			this.binder.dom = this.dom;
			this.binder.track();
		}
		
		for( index in this.items ){
			this.items[ index ].append( this.dom );
		}

		for( p in this.events )
			this.register_events(p, this.events[p]);

		this.binds();
	},

	update_child_template : function(){
		if( this.child_template !== undefined )
			for( tpl in this.child_template )
				this.template_data[ tpl ] = Handlebars.compile(this.child_template[ tpl ])(this.template_data);		
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

	append : function( receiver ){
		this.receiver = receiver;		
		receiver.appendChild( this.dom );
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
		this.dom.parentNode.removeChild( this.dom );
		delete this;
	}

});