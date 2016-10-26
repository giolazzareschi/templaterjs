var TemplaterList = Templater.extend({	

	isList : true,

	add : function( data, index ){

		this.template_data.items.push( data, index );

		return this.template_data.items;
	},

	remove : function( index ){

		this.template_data.items.pop( index );

		return this.template_data.items;
	}

});