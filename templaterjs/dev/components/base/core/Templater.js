var Templater = Base.extend({

	template : '',

	uuid: 0,

	template_data : undefined,

	child_template : undefined,

	dom : undefined,

	propagating: false,

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

	require : undefined,

	ispropagating: false,

	templaterwachter: undefined,

	Router: new Router(),

	TemplateCompilerEngine: new TemplateCompilerEngine(),

	constructor : function( args ){

		if( this.type === undefined ){
			throw "Type for Class needed.";
		}else{
			this.items = {};

			this.uuid = Math.round((+new Date) * Math.random() * .5/2);

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

			if(this.template_data.__$$templaterId === undefined) {
				this.template_data.__$$templaterId = Math.round((+new Date) * Math.random());
				Templater.reactionsMap[this.template_data.__$$templaterId] = {};
			}else{
				var
				reactionExists = Templater.reactionsMap[this.template_data.__$$templaterId];
				if(reactionExists === undefined) {
					Templater.reactionsMap[this.template_data.__$$templaterId] = {};
				}
			}
			Templater.reactionsMap[this.template_data.__$$templaterId][this.uuid] = this;
			
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
			
			if(this.isList) {
				this.update_dom();
				if(this.template_data.items && this.template_data.items.length)
					this.create_items(this);
				else if(args.items && typeof args.items === "string")
					this.create_items_string(this, args.items);
				this.appendListItems();
			}else{
				if(!this.template)
					this.template = "<div></div>";

				if(this.template)
					this.update_dom();
				else
					this.binds();
			}

			if( args && args.require !== undefined ){
				args.require.owner = this;
				this.require = new Requirer( args.require );
			}else if( this.require !== undefined ){
				this.require.owner = this;
				this.require = new Requirer( this.require );
			}
		}

		if(this.dom) {
			this.dom.classList.add(this.type);
		}

		return this;
	},

	setData : function(data,stopReact){
		this.deepfind(data,null,"","",this.binder.template_main,data,stopReact, this.cloneObject(data));
	},

	deepfind: function(where,binder_temp,token,root_label,main_data,originalSetData,stopReact, topLevelData){

		if( token === undefined ) token = "";

		var 
		binder = this.binder, 
		binder_;

		if(main_data) {
			for(var p in where){
				var 
				original = where && where[p],
				main_ = main_data && main_data[p],
				isarray = binder.isarray( original ),
				clean = isarray || binder.isobject( original ), 
				track = token + p + clean,
				clean_track = track.replace(/[_][0-9]|\_$/gi,''),
				noId = p !== "__$$templaterId",
				has_difference = JSON.stringify(original) !== JSON.stringify(main_);

				if(main_ !== undefined) {
					if(has_difference && noId){
						if( !clean ){
							if( original !== main_ ){

								var
								dom_,
								dom = dom_ = this.update_doms(p,track, original, root_label);

								this.update_original_simple( track, this.template_data, original );

								main_data[p] = this.cloneObject(where[p]);

								if(!stopReact) {
									if(!main_data.join)
										this.react({
											changed : p,
											dom : dom_,
											from : main_,
											to : original,
											originalSetData: originalSetData,
											reactId: main_data.__$$templaterId,
											complete_track: track,
											topLevelData: topLevelData
										});
								}else{
									var
									reaction = this.reactions && this.reactions[p];
									if(reaction)
										reaction.call(this,dom_,main_,original);
								}

								var
								hashash = this.binder.template_hash['{{$$item__.' + track + '}}']; 
								
								if(hashash !== undefined)
									this.binder.template_hash['{{$$item__.' + track + '}}'] = original;

								if(dom)
									this.binder.track();
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
										originalSetData: originalSetData,
										complete_track: track,
										topLevelData: topLevelData
									});
									continue;
								}
							}
							this.deepfind(original,binder_,track,p,main_,null,null,topLevelData);
						}
					}
				}
			}
		}
		this.binder.template_main = this.binder.cloneObject(this.template_data);

		return {};
	},

	update_doms: function(property, track, original, root_label) {
		var 
		dom_,
		p = property,
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

		if(dom && dom.length > 0) {
			var
			i =0,
			len = dom.length;
			for(;i<len;i++) {
				dom_ = dom[i];
				if(dom_) {
					if( dom_.$$templatersolo ){
						if( dom_.$$templatersoloowner ){
							if( original !== false ) {
								dom_.$$templatersoloowner.setAttribute(dom_.name, original);
								if(dom_.name.toLowerCase() === 'value') {
									if(dom_.value)
										dom_.value = original;
								}
							} else {
								dom_.$$templatersoloowner.removeAttribute(dom_.name);
							}
						}else{
							if( original !== false )
								dom_.ownerElement.setAttribute(dom_.name, original);
							else
								dom_.ownerElement.removeAttribute(dom_.name);
						}
					}else{
						if( typeof dom_.ownerElement !== 'undefined' )
							dom_  = dom_.ownerElement;
						
						if(dom_.nodeName.toLowerCase().match(/(^|\W)input|textarea($|\W)/gi)) {
							dom_.value = original;
						}else if(typeof dom_.textContent !== 'undefined') {
							dom_.textContent = original;
						}
					}
				}
			}
		}		

    return dom;
	},

	update_original_simple : function(track, original, value){
		var 
		i = 0, 
		qt = 0, 
		level, 
		olevels = track.split("."), 
		original_ = original;
		
		olevels = olevels.filter(function(n){ return n !== "" && n !== undefined && n !== null && n !== "$$item__" });

		qt = olevels.length;

		for( ; i < qt ; i++ ){
			level = olevels[ i ];
			if( this.isList && isNaN(level.match(/[_][0-9]+$/gi)*1) ){								
				var index = level.split("_");
				original_ = original_[ this.isList && original_.hasOwnProperty('items') ? 'items' : index[0] ][index[1]];
			}else{
				var inside = original_[ level ];
				if( typeof inside !== 'undefined' ){
					if(inside === null) {
						original_[ level ] = value; 
					}else{	
						var 
						tt = track.split('.'),
						deepest;
						
						for( var x = i; x > -1; x-- )
							tt.splice(x,1);

						deepest = tt.join('.');

						if(deepest && !this.isList && typeof inside === 'object' ){
							deepest = tt.join('.');
							return this.update_original_simple(deepest, inside, value);
						}else{
							if( !this.ispropagating ){
								if(inside.join){
									var s=0, new_end = (value && value.length) || 0;
									while(inside.length)
										this.pop_(s, track);
									for(; s<new_end; s++)
										this.push_(value[s], s, track);
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

	react: function(data){
		var 
		reacto,
		templates = Templater.reactionsMap[data.reactId || this.template_data.__$$templaterId];

		for(var templateId in templates) {
			var
			template = templates[templateId],
			reactions = template && template.reactions,
			reaction = reactions && reactions[data.changed],
			reaction_complete_track = reactions && reactions[data.complete_track],
			setData = {};

			if(template && template !== this) {
				setData = data.topLevelData;
				template.setData && template.setData(setData,true);
				template.update_doms(data.changed, data.complete_track, data.to);
				if(reaction)
					reaction.call(template, data.dom, data.from, data.to, data.info);
				if(reaction_complete_track && reaction_complete_track !== reaction)
					reaction_complete_track.call(template, data.dom, data.from, data.to, data.info);
			}else{
				if(reaction)
					reaction.call(this, data.dom, data.from, data.to, data.info);
				if(reaction_complete_track && reaction_complete_track !== reaction)
					reaction_complete_track.call(this, data.dom, data.from, data.to, data.info);
			}
		}
	},

	pop_: function(index, track, internal){
		if(!this.trackItemsIndex) {
			this.items = this.reindex( this.items );

			if(track) {
				this.template_data[track].splice(index, 1);
			}else{
				index = index === undefined || index === null ? this.template_data.items.length-1 : index;
				this.template_data.items.splice(index, 1);
			}

			this.removed_data(index, internal);
		}
	},

	removed_data: function( index, internal ){
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

			var 
			itemHasDom = item && item.dom;
			if(itemHasDom)
				itemHasDom.remove();

			delete this.items[String(index)];

			if(!internal)
				item && item.destroy();

			this.items = this.reindex( this.items );

			this.binder.template_main = this.binder.cloneObject( this.template_data );

			if(this.dom.nodeName.toLocaleLowerCase() === "tbody") {
				this.dom = this.dom.parentNode;
			}

			// this.reactList(item, index, false);
		}
	},

	push_: function(item, index, track){
		this.items = this.reindex(this.items);

		if(this.trackItemsIndex) {
			track = this.trackItemsIndex;
			if(!index)
				index = this.template_data[track].length;
		}

		if(track) {
			this.template_data[track].splice(index, 0, item);
		} else {
			if(this.template_data.items === undefined)
				this.template_data.items = [];
			
			index = index === undefined || index === null ? this.template_data.items.length : index;
			this.template_data.items.splice(index, 0, item);
		}

		this.added_data(item, index);
	},


	added_data: function(item,index){
		if(this.isList && this.isList === true){

			this.binder.dom = this.dom;

			if(this.items === undefined)
				this.items = {};

			var 
			reaction = {
				changed : this.trackItemsIndex || 'items',
				dom : this.dom,
				from : this.items,
				to : {},
				originalSetData: {}
			},
			typed = this.getListItemInstance(), 
			instance;
			if( typed ){
				instance = new typed({ 
					__parent : this,
					__index : index * 1,
					template_data : item || {}
				});

				instance.append( this.dom, index );
				
				var total=0	, newitems={};
				for( var i in this.items ){ total++ };

				for( var x=0; x < total; x++ ){
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

				// this.reactList(instance, index, true);

				reaction.to = newitems;
				reaction.info = {
					__index: index * 1,
					action: true,
					template: instance
				};
				// this.react(reaction);
			}
		}

		this.items = newitems;

		this.items = this.reindex( this.items );

		this.binder.template_main = this.binder.cloneObject( this.template_data );
	},

	getListItemInstance: function() {
		return window[ this.type + 'Item' ] || Templater.getClass(this.type + 'Item');
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

	create_items: function(parent){
		var 
		items = parent.template_data.items, 
		model_name = parent.type + 'Item', 
		model = window[model_name] || Templater.getClass(model_name), 
		cc = 0;

		model.prototype.type = model_name;
		model.prototype.isListItem = true;

		for( var i=0, e=items.length; i<e; i++ ){
			var
			template_data = items[ i ] || {};

			template_data.__index = cc*1;

			var tt = new model({
				__parent : parent,
				__index  : template_data.__index,
				template_data : template_data
			});

			parent.items[String(cc)] = tt;
			cc++;
		}
	},

	create_items_string: function(parent,itemsIndex){
		var 
		items = this.template_data[itemsIndex], 
		model_name = parent.type + 'Item', 
		model = window[model_name], 
		cc = 0;

		this.trackItemsIndex = itemsIndex;

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

		this.dom && this.dom.classList && this.dom.classList.add(this.type);
		this.binder.dom = this.dom;
		this.binder.track();

		this.appendListItems();
		
		if( !this.require )
			this.binds();

		this.registerEvents();
	},

	appendListItems: function() {
		for( var index in this.items )
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

	hbs: function() {
		var
		template7 = window.Template7,
		compile = template7.compile,
		template = this.template || "<div></div>",
		tpl = (this.binder.template_memo["$$item__"] || this.binder.template_memo),
		result;

    for (var property in this) {
      var
      split = property.toString().split("_"),
      isTemplate = split[split.length - 1].toLowerCase() === 'template';

      if (isTemplate) {
        var
        child_template = this[property];

        if (typeof child_template === 'string') {
          tpl[property] = compile(child_template)(tpl);
        }
      }
    }
		
		if (template.split === undefined && typeof template === "function") {
      template = template.call(this);
    }

		// result = this.TemplateCompilerEngine.compile(template, tpl);
		result = compile(template)(tpl);
		
		return result;
	},

	hbsHandlebars: function(){
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
				var doms = dom.querySelectorAll( selector );
				for(var i=0, qt=doms.length; i<qt; i++) {
					var dom = doms[i];
					dom.$$templaterpointer = this;
					dom.addEventListener(event, fn.bind(this, i), !1);
				}
			}else{
				if( event ){
					dom.$$templaterpointer = this;
					dom.addEventListener(event, fn.bind(this), !1);					
				}
			}
		}catch(e){
			console.log( selector );
			console.log( e );
		};
	},

	render: function(receiver){
		if(receiver) {
			this.receiver = receiver;
			receiver.innerHTML = "";
			receiver.appendChild( this.dom );
			if(this.afterRender)
				this.afterRender();
		}
	},

	append: function(receiver,index){
		if(receiver) {
			if(index === undefined){
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
		var
		id = this.template_data && this.template_data.__$$templaterId,
		reactionMap = Templater.reactionsMap[id];
		if(id !== undefined && reactionMap !== undefined)
			delete Templater.reactionsMap[id][this.uuid];

		if(this.__index !== undefined) {
			delete Templater.reactionsMap[id];
			this.__parent.pop_(this.__index, null, true);
		}
		
		if(this.dom && this.dom.parentNode)
			this.dom.parentNode.removeChild(this.dom);

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
	},

	reactionsMap: {},

  Classes: {},
  
	ClassesMeta: {},

	registerClass: function(className, instance, static, extendsFrom) {
    Templater.ClassesMeta[className] = {
      className: className,
      instance: instance,
      static: static,
      extendsFrom: extendsFrom
    };
  },
  
	register: function(className, instance, static, extendsFrom) {
		Templater.registerClass(className, instance, static, extendsFrom);
	},

	getClass: function(className) {
    var 
    meta = Templater.ClassesMeta[className],
    className = (meta && meta.className) || className,
    instance = (meta && meta.instance) || undefined,
    static = (meta && meta.static) || undefined,
    extendsFrom = (meta && meta.extendsFrom) || undefined,
    superClass;

    if(meta === undefined)
      return window[className];

    instance = instance || {};
    instance.type = className;

    if(className.slice(-4) !== "List") {
      superClass = extendsFrom ? Templater.getClass(extendsFrom) : Templater;
    } else {
      superClass = extendsFrom ? Templater.getClass(extendsFrom) : TemplaterList;
      if(instance.template_data === undefined)
          instance.template_data = {};
      if(instance.template_data.items === undefined)
        instance.template_data.items = [];
    }

    if(extendsFrom) {
      superClass.type = extendsFrom;
    }

    Templater.Classes[className] = superClass.extend(instance, static);

    return Templater.Classes[className] || window[className];
	},

	createClass: function(className, cf) {
		var
    klass = Templater.getClass(className);
    
    if(!klass)
      klass = window[className];

		if(cf === undefined)
			cf = {};

		if(cf) {
			if(cf.template_data === undefined)
					cf.template_data = {};

			if(className.slice(-4) === "List") {
				if(cf.template_data.items === undefined)
					cf.template_data.items = [];
			}
		}

		return new klass(cf || null);
	},

	create: function(className, cf) {
		return Templater.createClass(className, cf);
	}
});