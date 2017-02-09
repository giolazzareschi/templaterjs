var TemplaterList = Templater.extend({	

	isList : true,

	add : function( data, index ){

		this.template_data.items.push.call(this, data, index);

		return this.template_data.items;
	},

	remove : function( index ){

		this.template_data.items.pop.call(this, index);

		return this.template_data.items;
	}

});