var Templater = Base.extend({

	template : '',

	template_data : undefined,

	child_template : undefined,

	dom : undefined,

	afterRender: undefined,

	hasChild : false,

	events : {},

	buffer_rollback : undefined,

	parent : undefined,

	model : undefined,

	binder : {},

	items : {},

	type : 'Templater',

	isList : false,

	isListItem : false,

	debug : false,

	model : undefined,

	require : undefined,

	ispropagating: false,

	templaterwachter: undefined,

	Router: new Router(),

	changes : function(trackChanged, valueChanged, ispropagating, originalSetData, indexTemplateItem){
		if( this.binder.template_main ){

			if( ispropagating )
				this.ispropagating = ispropagating;
			
			this.setData( originalSetData );
			
			this.ispropagating = false;
		}
	},

	setData : function( data ){
		this.deepfind( data, null, "", "", this.binder.template_main, data );
	},

	createWatch: function() {
		if( !window.$$templaterwachter ){
			window.$$templaterwachter = new TemplaterWatcher();
		}
		
		this.templaterwachter = window.$$templaterwachter;

		// this.templaterwachter.register(this);
	},

	deepfind: function( where, binder_temp, token, root_label, main_data, originalSetData ){

		if( token === undefined ) token = "";

		var binder = this.binder, binder_;

		for( var p in where ){
			var 
				original = where[ p ],
				main_ = main_data[ p ],
				isarray = binder.isarray( original ),
				clean = isarray || binder.isobject( original ), 
				track = token + p + clean,
				clean_track = track.replace(/[_][0-9]|\_$/gi,''),
				has_difference = JSON.stringify(original) !== JSON.stringify(main_);

			if(has_difference){
				if( !clean ){

					if( original !== main_ ){

						var 
							dom_,
							dom = this.binder.template_hdom["{{$$item__." + track + "}}"];

						if( typeof dom === "undefined" ){
							if( !this.isList ){
								dom = this.items[ p ];
								if( dom && dom.__parent !== undefined )
									dom = dom.binder.template_hdom['item_' + p];
							}else{
								dom = this.items[ root_label ];
								if( dom )
									dom = dom.binder.template_hdom["{{$$item__." + p + "}}"];
							}
						}

						if( dom !== undefined && dom.length > 0 ){
							for(dd in dom){
								dom_ = dom[ dd ];
								if(dom_) {
									if( dom_.$$templatersolo ){
										if( dom_.$$templatersoloowner ){
											if( original !== false )
												dom_.$$templatersoloowner.setAttribute(dom_.name, original);
											else
												dom_.$$templatersoloowner.removeAttribute(dom_.name);
										}else{
											if( original !== false )
												dom_.ownerElement.setAttribute(dom_.name, original);
											else
												dom_.ownerElement.removeAttribute(dom_.name);
										}
									}else{
										if( typeof dom_.ownerElement !== 'undefined' )
											dom_  = dom_.ownerElement;
										
										if( typeof dom_.value !== 'undefined' )
											dom_.value = original;

										if( typeof dom_.textContent !== 'undefined' )
											dom_.textContent = original;
									}
								}
							}
						}

						this.update_original_simple( track, this.template_data, original );

						if( !main_data.join )
							this.react({
								changed : track,
								dom : dom_,
								from : main_,
								to : original,
								originalSetData: originalSetData
							});
							
						var hashash = this.binder.template_hash['$$item__.' + track];
						if( hashash !== undefined )
							this.binder.template_hash['$$item__.' + track] = original;

						if( dom ){
							this.binder.track();
						}
					}
				}else{

					binder_ = binder_temp ? binder_temp[p] : binder.template_main[p];

					if( clean == "_" ){

						main_ = this.isList && main_data.hasOwnProperty('items') ? main_data['items'] : main_data[ p ];
						
						if(has_difference){

							this.update_original_simple( clean_track, this.template_data, original );

							this.react({
								changed : clean_track,
								dom : null,
								from : binder.cloneObject( main_ ),
								to : original,
								originalSetData: originalSetData
							});

							continue;
						}
					}

					this.deepfind( original, binder_, track, p, main_ );
				}
			}
		}
		
		this.binder.template_main = this.binder.cloneObject( this.template_data );

		return {};
	},

	update_original_simple : function(track, original, value){
		var olevels = track.split("."), i = 0, qt = 0, level, original_ = original;
		
		olevels = olevels.filter(function(n){ return n !== "" && n !== undefined && n !== null && n !== "$$item__" });

		qt = olevels.length;

		for( ; i < qt ; i++ ){
			level = olevels[ i ];
			if( isNaN(level.match(/[_][0-9]+$/gi)*1) ){								
				var index = level.split("_");
				original_ = original_[ this.isList && original_.hasOwnProperty('items') ? 'items' : index[0] ][index[1]];
			}else{
				var inside = original_[ level ];
				if( typeof inside !== 'undefined' ){
					if(inside === null) {
						original_[ level ] = value; 
					}else{	
						if( !inside.join && typeof inside === 'object' ){
							var tt = track.split('.');					
							for( var x = i; x > -1; x-- )
								tt.splice(x,1);
							return this.update_original_simple(tt.join('.'), inside, value);
						}else{
							if( !this.ispropagating ){
								if(inside.join){
									var s=0, new_end = value.length;
									while(inside.length)
										inside._pop_();
									for(; s<new_end; s++)
										inside._push_(value[s]);
								}
							}
							if(!inside.join)
								original_[ level ] = value; 
						}
					}
				}
			}
		}
	},

	react : function( data ){
		var reacto = function(){};

		if( this.reactions ){
			reacto = this.reactions[ data.changed ];
			if( reacto )
				reacto.apply( this, [data.dom, data.from, data.to] );
		}

		if( !this.ispropagating ){
			this.ispropagating = false;
			Templater.propagatingTemplateData = this.template_data;
			// this.templaterwachter.propagate(data.changed, data.to, this.type, data.originalSetData, this.__index);
		}
	},

	setpushpop : function( where, token, root_label ){
		if( token === undefined ) token = "";

		var binder = this.binder;		

		if( this.isList ){
			for( var p in where ){
				var original = where[ p ],
				isarray = binder.isarray( original ),
				clean = isarray || binder.isobject( original ), 
				track = token + p + clean;

				if( typeof original === "function ") continue;

				if( clean && isarray ){
					// if( original.$$pushpop === undefined ){
					// 	original.$$pushpop = +new Date;
					original._pop_ = this.pop_.bind(this);
					original._push_ = this.push_.bind(this);
					// }
				}

				if( clean === "" && isarray === "" ) break;

				this.setpushpop( original, track, p );
			}
		}
	},

	pop_ : function( index ){

		this.items = this.reindex( this.items );

		index = index === undefined || index === null ? this.template_data.items.length-1 : index;
		
		this.template_data.items.splice(index, 1);

		this.removed_data(index);
	},

	push_ : function( item, index ){

		this.items = this.reindex( this.items );

		index = index === undefined || index === null ? this.template_data.items.length : index;
		
		this.template_data.items.splice(index, 0, item);

		this.added_data(item, index);
	},

	removed_data : function( index ){
		if( this.isList && this.isList === true ){
			var 
				item = this.items[ index ],
				tbody = this.dom.querySelector('tbody');
			
			if(this.dom.nodeName.toLocaleLowerCase() === "table") {
				if(tbody) {
					this.dom = tbody;
				}
			}

			this.binder.dom = this.dom;

			var itemHasDom = this.items[String(index)].dom;
			if(itemHasDom)
				itemHasDom.remove();

			delete this.items[String(index)];

			this.items = this.reindex( this.items );

			this.binder.template_main = this.binder.cloneObject( this.template_data );

			if(this.dom.nodeName.toLocaleLowerCase() === "tbody") {
				this.dom = this.dom.parentNode;
			}

			this.reactList(item, index, false);
		}
	},

	added_data : function( item, index ){
		if( this.isList && this.isList === true ){

			this.binder.dom = this.dom;

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

				this.reactList(instance, index, true);
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

	cloneObject : function(obj){
		if (obj === null || typeof obj !== 'object' || obj.template_data !== undefined)
			return obj;

		var temp = obj.constructor();
		for (var key in obj)
			temp[key] = this.cloneObject(obj[key]);

		return temp;		
	},

	constructor : function( args ){
		if( this.type === undefined ){
			throw "Type for Class needed.";
		}else{
			this.items = {};

			if( this.template_data === undefined )
				this.template_data = {};
			else
				this.template_data = this.cloneObject(this.template_data);

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

			if( args && args.model !== undefined ){
				args.model.owner = this;
				this.model = new RequesterAjax( args.model ); 
			}else if( this.model !== undefined ){
				this.model.owner = this;
				this.model = new RequesterAjax( this.model );
			}

			this.createWatch();
			
			if( this.isList ) {
				this.update_dom();
				if( this.template_data.items && this.template_data.items.length)
					this.create_items(this);
				this.appendListItems();
			}else{
				if(this.template)
					this.update_dom();
				else
					this.binds();
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

		return this;
	},

	create_items : function(parent){
		var items = parent.template_data.items, model_name = parent.type + 'Item', model = window[model_name], cc = 0;

		model.prototype.type = model_name;
		model.prototype.isListItem = true;

		for( var i=0, e=items.length; i<e; i++ ){
			var tt = new model({
				__parent : parent,
				__index  : cc*1,
				template_data : items[ i ] || {}
			});

			parent.items[String(cc)] = tt;
			cc++;
		}
	},

	binds : function(){},

	hide : function(){
		this.dom.classList.add("hide");
	},

	show : function(){
		this.dom.classList.remove("hide");
	},

	createBinder: function() {
		this.binder = new Binder({
			templater : this,
			template_data : this.template_data
		});
	},

	update_dom : function( rollback_dom ){

		this.createBinder();

		if( !rollback_dom ){
			var dom = document.createElement('div');
			if(!this.renderAsTable) {
				dom.innerHTML = this.hbs();
				this.dom = dom.firstChild;
				if(this.templateHeader) {
					var thead = document.createElement('thead');
					thead.innerHTML = this.templateHeader;
					this.dom.appendChild(thead);
				}
			}else{
				var 
					parentTbody = this.__parent.dom.querySelector("tbody"),
					tbody = document.createElement('tbody'),
					tempb = document.createElement('tbody');

				if(!parentTbody) {
					this.__parent.dom.appendChild(tbody);
					parentTbody = tbody;
				}

				tempb.innerHTML = this.hbs();
				this.dom = tempb.firstChild;
				parentTbody.appendChild(this.dom);
			}
		}else{
			this.dom = rollback_dom;
			this.buffer_rollback = undefined;
		}

		this.get_template_elements();

		this.binder.dom = this.dom;
		this.binder.track();

		this.appendListItems();
		
		if( !this.require )
			this.binds();

		this.registerEvents();
	},

	appendListItems: function() {
		for( index in this.items )
			this.items[ index ].append( this.dom );
	},

	registerEvents: function() {
		for( var p in this.events ) {
			this.register_events(p, this.events[p]);
		}
	},

	factory : function( proto ){
		var t = proto.data[0];

		var o = new proto.pattern({
			template_data : t
		});

		o.append( proto.renderdom );
	},

	hbs : function(){
		var 
			template = this.template,
			tpl = (this.binder.template_memo["$$item__"] || this.binder.template_memo);

		if( typeof this.child_template !== 'undefined' ) {
			if(this.child_template.modal_content)
				tpl.modal_content = Handlebars.compile(this.child_template.modal_content)(tpl);

			if(this.child_template.modal_actions)
				tpl.modal_actions = Handlebars.compile(this.child_template.modal_actions)(tpl);
		}
		
		if(template.split === undefined && typeof template === "function")
			template = template.call(this);

		return Handlebars.compile( template )( tpl );
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
		var 
			data = property.split(' '), 
			event = data[0], 
			selector = data.splice(1).join(' ').trim(), 
			dom = dom !== undefined ? dom : this.dom;

		try{
			if( selector ){
				var dd = dom.querySelectorAll( selector );
				for(var i=0, qt=dd.length; i<qt; i++)
					dd[ i ].addEventListener(event, fn.bind(this, i), !1);

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

	render: function( receiver ){
		this.receiver = receiver;
		receiver.innerHTML = "";
		receiver.appendChild( this.dom );
		if(this.afterRender)
			this.afterRender();
	},

	append : function( receiver, index ){
		if( index === undefined ){
			this.receiver = receiver;		
			receiver.appendChild( this.dom );
			if(this.afterRender)
				this.afterRender();
		}else{
			var sib = receiver.children[ index ];
			this.receiver = receiver;
			this.receiver.insertBefore( this.dom, sib );
			if(this.afterRender)
				this.afterRender();
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
	remove: function(){
		if( this.dom )
			if( this.dom.parentNode )
				this.dom.parentNode.removeChild( this.dom );		
	},
	destroy: function(){

		if( this.dom.parentNode )
			this.dom.parentNode.removeChild( this.dom );
		
		delete this;
	},

	cloneData : function( obj ){
	    if (obj === null || typeof obj !== 'object' || obj.template_data !== undefined)
	        return obj;
	 
	    var temp = obj.constructor();
	    for (var key in obj)
	        temp[key] = this.cloneData(obj[key]);
	 
	    return temp;		
	}

},{ 
	deeping_ : false,

	propagatingTemplateData: {},

	cloneObject : function(obj){
		if (obj === null || typeof obj !== 'object' || obj.template_data !== undefined)
			return obj;

		var temp = obj.constructor();
		for (var key in obj)
			temp[key] = this.cloneObject(obj[key]);

		return temp;		
	}
});