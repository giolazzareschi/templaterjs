var ListSearch = TemplaterList.extend({

	type : 'ListSearch',

	parent : undefined,

	autopaint : true,

	selected_items : [],

	limit : 1,

	toggle : function( item ){
		var pos = this.hasitem( item ), sels = this.selected_items.length;
		if( pos === false ){
			if( sels > 0  )
				this.unselectall();

			this.additem( item );
		}else{
			this.removeitem(item, pos);
		}
		this.parent.updateMessage( this.limit - this.selected_items.length );
	},

	unselectall : function(){
		var items = this.selected_items, i = 0 , qt = items.length;

		for( ; i < qt ; i++ ){
			items[ i ].css.selected = false;
			this.selected_items.splice(i,1);
		}

	},

	additem : function( item ){
		item.css.selected = true;
		this.selected_items.push(item);
	},

	hasitem : function( item ){
		var i=0, qt = this.selected_items.length, items = this.selected_items, has = false;
		
		for( ; i < qt; i++ ){
			if( items[ i ].name == item.name ){
				has = i;
				break;
			}
		}

		return has;
	},

	removeitem : function( item ,index ){
		item.css.selected = false;
		this.selected_items.splice(index,1);
	},

	binds : function(){

	},

	template : '<ul id="list" class="search-list {{cssClass}}"></ul>'

});