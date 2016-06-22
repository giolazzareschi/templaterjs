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

	type : undefined,

	listenpaint : function(){
		this.binder = new Binder({
			template_data : this.template_data,
			dom : this.dom
		});

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
			clean = binder.isarray( original ) || binder.isobject( original ), 
			track = token + p + clean;

			if( !clean ){
				if( original !== binder_temp[ p ] ){

					var dom = this.binder.template_hdom[track][0];

					dom.textContent ? dom.textContent = original : dom.value = original;

					this.react({
						changed : p,
						where : root_label,
						dom : dom
					});

					binder.template_main = binder.cloneObject( this.template_data );

					break;
				}
			}else{
				this.deepfind( original, binder_temp ? binder_temp[p] : binder.template_main[p], track, p );
			}
		}

		return {};
	},

	react : function( data ){
		var to = (function(){})() || this.reactions[ data.where ];

		to.apply( this, [data.dom, data.where] );
	},

	constructor : function( args ){
		if( this.type === undefined ){
			throw "Type fo Class needed."
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

			if( args && args.events !== undefined )
				this.events = args.events;

			if( args && args.parent !== undefined )
				this.parent = args.parent;

			if( (args && args.autopaint) || this.autopaint ){
				this.autopaint = args && args.autopaint ? args.autopaint : true;
				this.listenpaint();
			}

			if( this.template !== '' )
				this.update_dom();
		}
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
		if( !rollback_dom ){
			var dom = document.createElement('div');
			dom.innerHTML = this.hbs();
			this.dom = dom.children[0];
		}else{
			this.dom = rollback_dom;
			this.buffer_rollback = undefined;
		}

		if( this.autopaint ){
			this.binder.dom = this.dom;
			this.binder.track();
		}

		this.get_template_elements();

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
			dom.querySelector( selector ).addEventListener(event, fn.bind(this), !1);
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