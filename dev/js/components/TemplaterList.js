var TemplaterList = Templater.extend({	

	isList : true,

	add : function( data, index ){

		this.template_data.items.push.call(this, data, index);

		return this.template_data.items;
	},

	remove : function( index ){

		this.template_data.items.pop.call(this, index);

		return this.template_data.items;
	},

	reactList: function(item, index, added_or_removed){
		if( this.reactions && this.reactions.items ){
			this.reactions.items.call(this, [item, index, added_or_removed]);
		}
	}

});