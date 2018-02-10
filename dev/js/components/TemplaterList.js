var TemplaterList = Templater.extend({	

	isList : true,

	size: function() {
		var length = 0;

		for(var item in this.items)
			length++

		return length;
	},

	push : function( data, index ){
		this.push_(data, index);

		return this.template_data.items;
	},

	add : function( data, index ){
		this.push_(data, index);

		return this.template_data.items;
	},

	pop : function( index ){
		this.pop_(index);

		return this.template_data.items;
	},

	remove : function( index ){
		this.pop_(index);

		return this.template_data.items;
	},

	reactList: function(item, index, added_or_removed){
		if( this.reactions && this.reactions.items ){
			this.reactions.items.call(this, [item, index, added_or_removed]);
		}
	}

});