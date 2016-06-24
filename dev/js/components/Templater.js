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
			this.deepfind( this.template_data, null, "", "" );
		}
	},

	deepfind : function( where, binder_temp, token, root_label ){
		if( token === undefined ) token = "";

		var binder = this.binder;		

		for( var p in where ){
			var original = where[ p ],
			isarray = binder.isarray( original ),
			clean = isarray || binder.isobject( original ), 
			track = token + p + clean;

			if( !clean ){
				
				if( !binder_temp )
					binder_temp = binder.template_main[p];

				if( original !== binder_temp[ p ] ){

					this.binder.template_main = binder.cloneObject( this.template_data );

					var dom = this.binder.template_hdom[track];

					if( dom && dom.length ){
						dom = dom[0];
						dom.textContent ? dom.textContent = original : dom.value = original;

						this.react({
							changed : p,
							where : root_label,
							dom : dom
						});
					}

					break;
				}
			}else{
				binder_ = binder_temp ? binder_temp[p] : binder.template_main[p];

				this.deepfind( original, binder_, track, p );
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
				original.pop = this.pop_.bind(this, original, track.slice(0, -1));
				original.push = this.push_.bind(this, original, track.slice(0, -1));
			}

			this.setpushpop( original, track, p );
		}
	},

	pop_ : function( array_, track_id, index ){
		index = index === undefined || index === null ? array_.length : index;
		
		array_.splice(index, 1);

		this.removed_data(track_id, index)
	},

	push_ : function( array_, track_id, item, index ){
		index = index === undefined || index === null ? array_.length : index;
		
		array_.splice(index, 0, item);

		this.added_data(track_id, index)
	},

	removed_data : function( track_id, index ){
		try{
			this.reactions[ track_id ].remove.apply( this, [{index: index}] );
		}catch(e){};

		var item = this.items[ index ];
		item.dom.parentNode.removeChild( item.dom );
		delete this.items[String(index)];

		this.binder.template_main = this.binder.cloneObject( this.template_data );	
	},


	added_data : function( track_id, index ){
		try{
			this.reactions[ track_id ].add.apply( this, [{index: index}] );
		}catch(e){};

		this.binder.template_main = this.binder.cloneObject( this.template_data );	
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

			if( args && args.model !== undefined ){
				args.model.owner = this;
				this.ajax = new Ajax( args.model );
			}else if( this.model !== undefined ){
				this.model.owner = this;
				this.ajax = new Ajax( this.model );
			}

			if( args && args.template !== undefined && args.template !== '' )
				this.template = args.template;

			if( args && args.template_data !== undefined )
				this.template_data = args.template_data;

			if( this.isList )
				if( this.template_data.items !== undefined )
					this.create_items();

			if( args && args.events !== undefined )
				this.events = args.events;

			if( args && args.parent !== undefined )
				this.parent = args.parent;

			if( this.template !== '' )
				this.update_dom();

			if( (args && args.autopaint) || this.autopaint ){
				this.autopaint = args && args.autopaint ? args.autopaint : true;
				this.listenpaint();
			}
		}
	},

	create_items : function(){		
		var items = this.template_data.items, model_name = this.type + 'Item', model = window[model_name];

		model.prototype.type = model_name;
		model.prototype.isListItem = true;

		var tt = new model({
			template_data : {
				item : items[0]
			}
		});

		tt.parent = this;

		this.items['0'] = tt;

		tt = new model({
			template_data : {
				item : items[1]
			}
		});

		tt.parent = this;

		this.items['1'] = tt;

		tt = new model({
			template_data : {
				item : items[2]
			}
		});

		tt.parent = this;

		this.items['2'] = tt;
	},

	server_get : function(){		
		this.ajax.get__();
	},

	hbs : function(){
		this.update_child_template();		
		var tpl = !this.autopaint ? this.template_data : this.binder.template_memo;
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